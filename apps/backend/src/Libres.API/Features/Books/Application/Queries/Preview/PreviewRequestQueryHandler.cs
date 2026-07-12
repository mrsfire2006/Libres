using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Libres.API.Data.Persistence;
using Libres.API.Features.Books.Application.Common;
using Libres.API.Features.Books.Application.Extensions;
using Libres.API.Shared.Application.CustomError;
using Libres.API.Shared.Application.Mediator;
using Microsoft.EntityFrameworkCore;

namespace Libres.API.Features.Books.Application.Queries.Preview
{
    public class PreviewRequestQueryHandler : ICustomRequestHandler<PreviewRequestQuery, Result<byte[]>>
    {

        private readonly AppDbContext _context;
        private readonly IHostEnvironment _environment;
        public PreviewRequestQueryHandler(AppDbContext context, IHostEnvironment environment)
        {
            _context = context;
            _environment = environment;
        }
        public async Task<Result<byte[]>> HandleAsync(PreviewRequestQuery request, CancellationToken cancellationToken)
        {
            var book = await _context.Books.FirstOrDefaultAsync(x => x.Id == request.BookId, cancellationToken);
            if (book == null)
            {
                return new ResultBuilder<byte[]>().WithFailure("Book not found").Build();
            }
            if (book.FilePath != null)
            {
                var bytes = BookExtenstions.GeneratePreviewBytes(book.FilePath, 1, 10, _environment);
                return new ResultBuilder<byte[]>().WithSuccess(bytes).Build();
            }
            return new ResultBuilder<byte[]>().WithFailure("Cannot Find file").Build();

        }

    }
}