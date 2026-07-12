using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Libres.API.Features.Books.Application.Common;
using Libres.API.Features.Books.Application.Queries.AuthorBook;
using Libres.API.Shared.Application.CustomError;
using Libres.API.Shared.Application.Mediator;

namespace Libres.API.Features.Books.Application.Queries.AuthorBooks
{
    public record AuthorBooksRequestQuery : ICustomRequest<Result<IEnumerable<AuthorBookResponse>>>
    {
        public Guid UserId { get; }

        public AuthorBooksRequestQuery(Guid userId)
        {
            UserId = userId;
        }
    };

}