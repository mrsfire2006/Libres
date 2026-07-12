using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;
using Libres.API.Features.Books.Application.Common;
using Libres.API.Shared.Application.CustomError;
using Libres.API.Shared.Application.Mediator;
using Microsoft.AspNetCore.Mvc.ModelBinding;

namespace Libres.API.Features.Books.Application.Queries.Book
{
    public record BookByIdRequestQuery(Guid BookId) : ICustomRequest<Result<GetBookResponse>>
    {
        [JsonIgnore]
        [BindNever]
        public Guid UserId { get; set; }
    };

}