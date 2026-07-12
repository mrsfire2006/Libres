using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Libres.API.Data.Persistence;
using Libres.API.Features.Books.Application.Common;
using Libres.API.Features.Books.Application.Extensions;
using Libres.API.Features.Books.Application.Queries.AuthorBook;
using Libres.API.Shared.Application.CustomError;
using Libres.API.Shared.Application.Mediator;
using Libres.API.Shared.Application.Services;
using Microsoft.EntityFrameworkCore;

namespace Libres.API.Features.Books.Application.Queries.AuthorBooks
{
    public class AuthorBooksRequestQueryHandler : ICustomRequestHandler<AuthorBooksRequestQuery, Result<IEnumerable<AuthorBookResponse>>>
    {

        private readonly AppDbContext _context;
        private readonly FileService _fileService;
        private readonly IHostEnvironment _environment;

        public AuthorBooksRequestQueryHandler(AppDbContext context, FileService fileService, IHostEnvironment environment)
        {
            _context = context;
            _fileService = fileService;
            _environment = environment;
        }
        public async Task<Result<IEnumerable<AuthorBookResponse>>> HandleAsync(AuthorBooksRequestQuery request, CancellationToken cancellationToken)
        {

            var booksData = await (from book in _context.Books.AsNoTracking()
                                   join user in _context.Users.AsNoTracking()
                                   on book.UserId equals user.Id

                                   join category in _context.Categories.AsNoTracking()
                                   on book.CategoryId equals category.Id into categoryGroup
                                   from subCategory in categoryGroup.DefaultIfEmpty()
                                   where user.Id == request.UserId
                                    orderby book.CreatedAt descending
                                   select new
                                   {
                                       Id = book.Id,
                                       Title = book.Title,
                                       CategoryName = subCategory != null ? subCategory.Name : null,
                                       book.Price,
                                       book.BookStatus,
                                       book.Order,
                                       book.Description,
                                       book.CreatedAt,
                                       book.CoverImagePath,
                                       book.AverageRating,
                                       book.FilePath
                                   }
                        ).ToListAsync();



            var books = booksData.Select(x => new AuthorBookResponse(
                x.Id,
                x.Title,
                x.CategoryName,
                x.Price,
                x.BookStatus.ToString(),
                x.Order,
                x.Description,
                x.CreatedAt,
                $"{_fileService.GetBaseUrl()}/{x.CoverImagePath}",
                x.AverageRating
             ));



            return new ResultBuilder<IEnumerable<AuthorBookResponse>>().WithSuccess(books).Build();

        }
    }
}