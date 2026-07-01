using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Libres.API.Features.Books.Application.Common;
using Libres.API.Shared.Application.CustomError;
using Libres.API.Shared.Application.Mediator;

namespace Libres.API.Features.Books.Application.Queries.Books
{
    public record BooksRequestQuery(Guid? categoryId,
         int PageNumber = 1,
         int PageSize = 10) : ICustomRequest<Result<IEnumerable<BookResponse>>>;

}