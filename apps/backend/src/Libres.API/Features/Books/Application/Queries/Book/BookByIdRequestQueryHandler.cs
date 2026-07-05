using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Libres.API.Data.Persistence;
using Libres.API.Features.Books.Application.Common;
using Libres.API.Shared.Application.CustomError;
using Libres.API.Shared.Application.Mediator;
using Libres.API.Shared.Application.Services;
using Microsoft.EntityFrameworkCore;

namespace Libres.API.Features.Books.Application.Queries.Book
{
    public class BookByIdRequestQueryHandler : ICustomRequestHandler<BookByIdRequestQuery, Result<BookResponse>>
    {
        private readonly AppDbContext _context;
        private readonly FileService _fileService;

        public BookByIdRequestQueryHandler(AppDbContext context, FileService fileService)
        {
            _context = context;
            _fileService = fileService;
        }
        public async Task<Result<BookResponse>> HandleAsync(BookByIdRequestQuery request, CancellationToken cancellationToken)
        {
            var bookData = await (from book in _context.Books.AsNoTracking()
                                  join user in _context.Users on book.UserId equals user.Id
                                  join category in _context.Categories on book.CategoryId equals category.Id into categoryGroup
                                  from subCategory in categoryGroup.DefaultIfEmpty()
                                  where book.Id == request.BookId
                                  select new
                                  {
                                      book.Id,
                                      book.Title,
                                      UserName = user.UserName ?? "",
                                      book.UserId,
                                      book.CategoryId,
                                      CategoryName = subCategory != null ? (subCategory.Name ?? "") : "",
                                      book.Price,
                                      Status = book.BookStatus.ToString(),
                                      book.Order,
                                      book.Description,
                                      book.CreatedAt,
                                      book.CoverImagePath,
                                      book.FilePath
                                  })
                                  .FirstOrDefaultAsync(cancellationToken);

            if (bookData == null)
            {
                return Result<BookResponse>.Failure(Error.Validation("Book not found"));
            }

            var baseUrl = _fileService.GetBaseUrl();

            var bookResponse = new BookResponse(
                bookData.Id,
                bookData.Title,
                bookData.UserName,
                bookData.UserId,
                bookData.CategoryId,
                bookData.CategoryName,
                bookData.Price,
                bookData.Status,
                bookData.Order,
                bookData.Description,
                bookData.CreatedAt,
                bookData.CoverImagePath != null ? $"{baseUrl}/{bookData.CoverImagePath}" : null,
                bookData.FilePath != null ? $"{baseUrl}/{bookData.FilePath}" : null
            );

            return Result<BookResponse>.Success(bookResponse);
        }
    }
}