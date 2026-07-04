using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Libres.API.Common;
using Libres.API.Data.Persistence;
using Libres.API.Features.Books.Application.Common;
using Libres.API.Features.Books.Domain;
using Libres.API.Shared.Application.CustomError;
using Libres.API.Shared.Application.Mediator;
using Libres.API.Shared.Application.Services;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;

namespace Libres.API.Features.Books.Application.Queries.Books
{
    public class BooksRequestQueryHandler : ICustomRequestHandler<BooksRequestQuery, Result<IEnumerable<BookResponse>>>
    {
        private readonly AppDbContext _context;
        private readonly FileService _fileService;
        public BooksRequestQueryHandler(AppDbContext context, FileService fileService)
        {
            _context = context;
            _fileService = fileService;


        }
        public async Task<Result<IEnumerable<BookResponse>>> HandleAsync(BooksRequestQuery request, CancellationToken cancellationToken)
        {
            var pageNumber = request.PageNumber ?? 1;
            var pageSize = request.PageSize ?? 10;
            var skipAmount = (pageNumber - 1) * pageSize;

            var query = from book in _context.Books.AsNoTracking()
                        join user in _context.Users on book.UserId equals user.Id
                        join category in _context.Categories on book.CategoryId equals category.Id into categoryGroup
                        from subCategory in categoryGroup.DefaultIfEmpty()
                        select new { book, user, subCategory };

            if (request.categoryId.HasValue && request.categoryId.Value != Guid.Empty)
            {
                query = query.Where(x => x.book.CategoryId == request.categoryId);
            }

            var books = await query
                    .OrderBy(x => x.book.Title)
                    .Skip(skipAmount)
                    .Take(request.PageSize ?? 10)
                    .Select(x => new BookResponse(
                        x.book.Id,
                        x.book.Title,
                        x.user.UserName ?? "",
                        x.book.UserId,
                        x.book.CategoryId,
                        x.subCategory != null ? (x.subCategory.Name ?? "") : "",

                        x.book.Price,
                        x.book.BookStatus.ToString(),
                        x.book.Description,
                        x.book.CreatedAt,
                        x.book.CoverImagePath != null ? $"{_fileService.GetBaseUrl()}/{x.book.CoverImagePath}" : null,
                        x.book.FilePath != null ? $"{_fileService.GetBaseUrl()}/{x.book.FilePath}" : null
                    ))
                    .ToListAsync(cancellationToken);

            return Result<IEnumerable<BookResponse>>.Success(books);
        }
    }
}