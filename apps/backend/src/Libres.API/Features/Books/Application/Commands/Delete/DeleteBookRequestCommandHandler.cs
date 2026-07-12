using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Libres.API.Data.Persistence;
using Libres.API.Shared.Application.CustomError;
using Libres.API.Shared.Application.Mediator;
using Libres.API.Shared.Application.Services;
using Libres.API.Shared.Domain.Enums;
using Microsoft.EntityFrameworkCore;

namespace Libres.API.Features.Books.Application.Commands.Delete
{
    public class DeleteBookRequestCommandHandler : ICustomRequestHandler<DeleteBookRequestCommand, Result>
    {
        private readonly AppDbContext _context;
        private readonly FileService _fileService;
        public DeleteBookRequestCommandHandler(AppDbContext context, FileService fileService)
        {
            _context = context;
            _fileService = fileService;
        }
        public async Task<Result> HandleAsync(DeleteBookRequestCommand request, CancellationToken cancellationToken)
        {
            var book = await _context.Books.FirstOrDefaultAsync(x => x.Id == request.BookId);
            if (book == null)
            {
                return new ResultBuilder().WithFailure("Book Not Found").Build();

            }
            if (book.BookStatus != BookStatus.Rejected)
            {
                return new ResultBuilder().WithFailure("The book is currently under review or Accepted.").Build();


            }


            _fileService.DeleteFileIfExists(book.FilePath);
            _fileService.DeleteFileIfExists(book.CoverImagePath);
            _context.Books.Remove(book);
            await _context.SaveChangesAsync(cancellationToken);
            return new ResultBuilder().WithSuccess().Build();

        }



    }
}