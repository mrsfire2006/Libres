using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Libres.API.Data.Persistence;
using Libres.API.Features.Books.Application.Common;
using Libres.API.Features.Books.Domain;
using Libres.API.Shared.Application.CustomError;
using Libres.API.Shared.Application.Mediator;
using Microsoft.EntityFrameworkCore;

namespace Libres.API.Features.Books.Application.Queries.Books
{
    public class BooksRequestQueryHandler : ICustomRequestHandler<BooksRequestQuery, Result<IEnumerable<BookResponse>>>
    {
        private readonly AppDbContext _context;
        private readonly string _baseUrl;

        public BooksRequestQueryHandler(AppDbContext context, IConfiguration config)
        {
            _context = context;
            _baseUrl = config["Storage:BaseUrl"]!;

        }
        public async Task<Result<IEnumerable<BookResponse>>> HandleAsync(BooksRequestQuery request, CancellationToken cancellationToken)
        {
            var skipAmount = (request.PageNumber - 1) * request.PageSize;

            // ابدأ بجدول الكتب مباشرة دون عمل Join معقد يعطل النتيجة
            IQueryable<Book> query = _context.Books.AsNoTracking();

            if (request.categoryId.HasValue && request.categoryId.Value != Guid.Empty)
            {
                query = query.Where(x => x.CategoryId == request.categoryId);
            }

            var books = await query
                        .OrderBy(x => x.Title)
                        .Skip(skipAmount)
                        .Take(request.PageSize)
                        .Select(book => new BookResponse(
                             book.Id,
                             book.Title,
                             _context.Users.Where(u => u.Id == book.UserId).Select(u => u.UserName).FirstOrDefault() ?? "",
                             book.UserId,
                             book.CategoryId,
                             _context.Categories.Where(c => c.Id == book.CategoryId).Select(c => c.Name).FirstOrDefault() ?? "",
                             book.Price,
                             book.BookStatus.ToString(),
                             book.Description,
                             book.CreatedAt,
                             book.CoverImagePath != null ? $"{_baseUrl}/{book.CoverImagePath}" : null,
                             book.FilePath != null ? $"{_baseUrl}/{book.FilePath}" : null
                        ))
                        .ToListAsync(cancellationToken);

            return Result<IEnumerable<BookResponse>>.Success(books);
        }
    }
}