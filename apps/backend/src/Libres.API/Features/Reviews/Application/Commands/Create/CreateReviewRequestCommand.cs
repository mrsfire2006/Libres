using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;
using Libres.API.Shared.Application.CustomError;
using Libres.API.Shared.Application.Mediator;
using Microsoft.AspNetCore.Mvc.ModelBinding;

namespace Libres.API.Features.Reviews.Application.Commands.Create
{
    public record CreateReviewRequestCommand(Guid BookId, string? comment, int rating = 1) : ICustomRequest<Result>
    {
        [JsonIgnore]
        [BindNever]
        public Guid UserId { get; set; }

    };

}