using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;
using Libres.API.Features.Books.Application.Common;
using Libres.API.Shared.Application.CustomError;
using Libres.API.Shared.Application.Mediator;
using Microsoft.AspNetCore.Mvc.ModelBinding;

namespace Libres.API.Features.Books.Application.Commands.Create
{
    public record CreateBookRequest(
        string Title,
         Guid? CategoryId,
        string? Description,
        decimal Price,
        IFormFile? CoverImage,
        IFormFile? File
    ) : ICustomRequest<Result<CreateBookResponse>>
    {
        [JsonIgnore]
        [BindNever]
        public Guid UserId { get; set; }
    };

}