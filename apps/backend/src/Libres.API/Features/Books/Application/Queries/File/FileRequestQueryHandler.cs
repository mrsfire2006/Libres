using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Libres.API.Data.Persistence;
using Libres.API.Features.Books.Application.Common;
using Libres.API.Features.Books.Application.Extensions;
using Libres.API.Shared.Application.CustomError;
using Libres.API.Shared.Application.Mediator;
using Libres.API.Shared.Application.Services;
using Microsoft.EntityFrameworkCore;

namespace Libres.API.Features.Books.Application.Queries.File
{
    public class FileRequestQueryHandler : ICustomRequestHandler<FileRequestQuery, Result<FileResponse>>
    {
        private readonly AppDbContext _context;
        private readonly FileService _fileService;
        private readonly IHostEnvironment _environment;
        public FileRequestQueryHandler(AppDbContext context, FileService fileService, IHostEnvironment environment)
        {
            _context = context;
            _fileService = fileService;
            _environment = environment;
        }
        public async Task<Result<FileResponse>> HandleAsync(FileRequestQuery request, CancellationToken cancellationToken)
        {
            var book = await _context.Books.FirstOrDefaultAsync(x => x.Id == request.BookId);
            if (book == null)
            {
                return new ResultBuilder<FileResponse>().WithFailure("Book not found").Build();
            }

            if (book.UserId != request.UserId)
            {
                var hasAccess = await _context.Libraries
                    .AnyAsync(x => x.BookId == request.BookId && x.UserId == request.UserId, cancellationToken);

                if (!hasAccess)
                {
                    return new ResultBuilder<FileResponse>().WithFailure("Forbidden", 403).Build();
                }
            }

            var bytes = BookExtenstions.GenerateFullBookBytes(book.FilePath!, _environment);

            return new ResultBuilder<FileResponse>()
               .WithSuccess(new FileResponse(bytes))
               .Build();
        }
    }
}