using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Libres.API.Data.Persistence;
using Libres.API.Features.Books.Application.Common;
using Libres.API.Features.Books.Application.Extensions;
using Libres.API.Features.Books.Domain.Entities;
using Libres.API.Shared.Application.CustomError;
using Libres.API.Shared.Application.Mediator;
using Libres.API.Shared.Application.Services;
using Microsoft.EntityFrameworkCore;
using UglyToad.PdfPig;

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
                                      book.FilePath,

                                      AverageRate = book.Reviews.Any() ? book.Reviews.Average(r => r.Rating) : 0.0,

                                      Reviews = (from r in _context.Reviews
                                                 join reviewUser in _context.Users on r.UserId equals reviewUser.Id
                                                 where r.BookId == book.Id
                                                 orderby r.CreatedAt descending
                                                 select new ReviewResponse(
                                                     r.Id,
                                                     r.Comment,
                                                     r.Rating,
                                                     reviewUser.UserName ?? "",
                                                     reviewUser.Image,
                                                     r.CreatedAt
                                                 ))
                                                 .Take(10)
                                                 .ToList(), 

                                      HasAlreadyReviewed = book.Reviews.Any(x => x.UserId == request.UserId)
                                  })
                                  .FirstOrDefaultAsync(cancellationToken);

            if (bookData == null)
            {
                return new ResultBuilder<BookResponse>().WithFailure("Book not found").Build();
            }

            var baseUrl = _fileService.GetBaseUrl();
            long fileSizeInBytes = 0;
            int pagesCount = 0;
            if (bookData.FilePath != null)
            {
                pagesCount = BookExtenstions.GetPdfPageCount(bookData.FilePath);
                fileSizeInBytes = BookExtenstions.GetPdfSize(bookData.FilePath);
            }

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
                bookData.FilePath != null ? $"{baseUrl}/{bookData.FilePath}" : null,
                bookData.Reviews,
                bookData.AverageRate,
                pagesCount,
                fileSizeInBytes,
                bookData.HasAlreadyReviewed
            );

            return new ResultBuilder<BookResponse>().WithSuccess(bookResponse).Build();
        }


    }


}