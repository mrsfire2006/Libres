using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Libres.API.Data.Persistence;
using Libres.API.Features.Books.Application.Common;
using Libres.API.Shared.Application.CustomError;
using Libres.API.Shared.Application.Mediator;
using Libres.API.Shared.Domain.Enums;
using Microsoft.EntityFrameworkCore;

namespace Libres.API.Features.Books.Application.Queries.BookBio
{
    public class BookBioRequestQueryHandler : ICustomRequestHandler<BookBioRequestQuery, Result<BookBioResponse>>
    {
        private readonly AppDbContext _context;
        public BookBioRequestQueryHandler(AppDbContext context)
        {
            _context = context;
        }
        public async Task<Result<BookBioResponse>> HandleAsync(BookBioRequestQuery request, CancellationToken cancellationToken)
        {
            var userBooksQuery = _context.Books
                .AsNoTracking()
                .Where(book => book.UserId == request.UserId);

            var authorBio = await userBooksQuery
               .GroupBy(b => b.UserId)
               .Select(g => new BookBioResponse
               (
                   g.Count(),
                   g.Count(b => b.BookStatus == BookStatus.Accepted),
                   g.Sum(b => b.Order)
               ))
               .FirstOrDefaultAsync();

            return new ResultBuilder<BookBioResponse>().WithSuccess(authorBio).Build();
        }
    }
}