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
using UglyToad.PdfPig;

namespace Libres.API.Features.Books.Application.Queries.Book
{
    public class BookByIdRequestQueryHandler : ICustomRequestHandler<BookByIdRequestQuery, Result<GetBookResponse>>
    {
        private readonly AppDbContext _context;
        private readonly FileService _fileService;
        private readonly IHostEnvironment _environment;

        public BookByIdRequestQueryHandler(AppDbContext context, FileService fileService, IHostEnvironment environment)
        {
            _context = context;
            _fileService = fileService;
            _environment = environment;
        }
        public async Task<Result<GetBookResponse>> HandleAsync(BookByIdRequestQuery request, CancellationToken cancellationToken)
        {
            var bookData = await (from book in _context.Books.AsNoTracking()
                                  join user in _context.Users.AsNoTracking() on book.UserId equals user.Id
                                  join category in _context.Categories.AsNoTracking() on book.CategoryId equals category.Id into categoryGroup
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
                                      book.AverageRating,
                                      book.FilePath,
                                      book.ReviewsCount,
                                      HasUserReviewed = _context.Reviews.Any(r => r.BookId == book.Id && r.UserId == request.UserId)
                                  })
                       .FirstOrDefaultAsync(cancellationToken);

            if (bookData == null)
            {
                return new ResultBuilder<GetBookResponse>().WithFailure("Book not found").Build();
            }

            var baseUrl = _fileService.GetBaseUrl();
            long fileSizeInBytes = 0;
            int pagesCount = 0;
            if (bookData.FilePath != null)
            {
                pagesCount = BookExtenstions.GetPdfPageCount(bookData.FilePath, _environment);
                fileSizeInBytes = BookExtenstions.GetPdfSize(bookData.FilePath, _environment);
            }

            var bookResponse = new GetBookResponse(
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
                 bookData.AverageRating,
                pagesCount,
                fileSizeInBytes,
                bookData.ReviewsCount,
                bookData.HasUserReviewed
            );

            return new ResultBuilder<GetBookResponse>().WithSuccess(bookResponse).Build();
        }


    }


}