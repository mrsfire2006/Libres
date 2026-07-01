using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Libres.API.Data.Persistence;
using Libres.API.Shared.Application.CustomError;
using Libres.API.Shared.Application.Mediator;
using Libres.API.Shared.Domain.Enums;
using Microsoft.EntityFrameworkCore;

namespace Libres.API.Features.Books.Application.Commands.Delete
{
    public class DeleteBookRequestCommandHandler : ICustomRequestHandler<DeleteBookRequestCommand, Result<string>>
    {
        private readonly AppDbContext _context;
        public DeleteBookRequestCommandHandler(AppDbContext context)
        {
            _context = context;
        }
        public async Task<Result<string>> HandleAsync(DeleteBookRequestCommand request, CancellationToken cancellationToken)
        {
            var book = await _context.Books.FirstOrDefaultAsync(x => x.Id == request.BookId);
            if (book == null)
            {
                return Result<string>.Failure(Error.NotFound("Book Not Found"));
            }
            if (book.BookStatus != BookStatus.Rejected)
            {
                return Result<string>.Failure(Error.Conflict("The book is currently under review or Accepted."));

            }


            DeleteIfExists(book.FilePath, book.CoverImagePath);
            _context.Books.Remove(book);
            await _context.SaveChangesAsync(cancellationToken);

            return Result<string>.Success("Book removed");


        }

        private void DeleteIfExists(string? filePath, string? coverPath)
        {
            if (filePath is not null && File.Exists(filePath))
                File.Delete(filePath);
            if (coverPath is not null && File.Exists(coverPath))
                File.Delete(coverPath);
        }

    }
}