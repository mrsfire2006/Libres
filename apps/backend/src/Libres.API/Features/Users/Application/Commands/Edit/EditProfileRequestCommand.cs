using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;
using Libres.API.Features.Users.Application.Common;
using Libres.API.Shared.Application.CustomError;
using Libres.API.Shared.Application.Mediator;
using Microsoft.AspNetCore.Mvc.ModelBinding;

namespace Libres.API.Features.Users.Application.Commands.Edit
{
    public record EditProfileRequestCommand(string username, bool deleteCurrentImage, IFormFile? image) : ICustomRequest<Result<string>>
    {
        [JsonIgnore]
        [BindNever]

        public Guid UserId { get; set; }
    };

}