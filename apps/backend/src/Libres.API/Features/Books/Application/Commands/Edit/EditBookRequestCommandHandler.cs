using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Libres.API.Common;
using Libres.API.Data.Persistence;
using Libres.API.Features.Books.Application.Common;
using Libres.API.Features.Books.Application.Extensions;
using Libres.API.Shared.Application.CustomError;
using Libres.API.Shared.Application.Mediator;
using Libres.API.Shared.Application.Services;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;

namespace Libres.API.Features.Books.Application.Commands.Edit
{
    public class EditBookRequestCommandHandler : ICustomRequestHandler<EditBookRequestCommand, Result<BookResponse>>
    {

        private readonly AppDbContext _context;
        private readonly FileService _fileService;


        public EditBookRequestCommandHandler(AppDbContext context, FileService fileService)
        {
            _context = context;
            _fileService = fileService;


        }
        public async Task<Result<BookResponse>> HandleAsync(EditBookRequestCommand request, CancellationToken cancellationToken)
        {
            var book = await _context.Books.FirstOrDefaultAsync(x => x.Id == request.BookId);
            if (book == null)
            {
                return new ResultBuilder<BookResponse>().WithFailure("Book Not Found").Build();

            }
            var resultName = book.ChangeName(request.Title);
            var resultDescription = book.ChangeDescription(request.Description);
            if (resultName.IsFailure)
            {
                return new ResultBuilder<BookResponse>().WithFailure(resultName.ErrorMessage).Build();


            }

            await _context.SaveChangesAsync(cancellationToken);

            long fileSizeInBytes = 0;
            int pagesCount = 0;
            if (book.FilePath != null)
            {
                pagesCount = BookExtenstions.GetPdfPageCount(book.FilePath);
                fileSizeInBytes = BookExtenstions.GetPdfSize(book.FilePath);

            }


            var bookResponse = await _context.Books.AsNoTracking()
            .Where(x => x.Id == request.BookId)
            .Select(book => new BookResponse(
                 book.Id,
                 book.Title,
                 _context.Users.Where(u => u.Id == book.UserId).Select(u => u.UserName).FirstOrDefault() ?? "",
                 book.UserId,
                 book.CategoryId,
                 _context.Categories.Where(c => c.Id == book.CategoryId).Select(c => c.Name).FirstOrDefault() ?? "",
                 book.Price,
                 book.BookStatus.ToString(),
                 book.Order,
                 book.Description,
                 book.CreatedAt,
                 book.CoverImagePath != null ? $"{_fileService.GetBaseUrl()}/{book.CoverImagePath}" : null,
                 book.FilePath != null ? $"{_fileService.GetBaseUrl()}/{book.FilePath}" : null,
                null,
                book.AverageRate,
                pagesCount,
                fileSizeInBytes
            )).FirstOrDefaultAsync(cancellationToken);


            return new ResultBuilder<BookResponse>().WithSuccess(bookResponse).Build();

        }
    }
}