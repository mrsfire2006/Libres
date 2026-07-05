using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;
using Libres.API.Shared.Application.CustomError;
using Libres.API.Shared.Application.Mediator;
using Microsoft.AspNetCore.Mvc.ModelBinding;

namespace Libres.API.Features.Users.Application.Commands.UpdatePassword
{
    public record UpdatePasswordRequestCommand(string CurrentPassword, string NewPassword) : ICustomRequest<Result<string>>
    {
        [JsonIgnore]
        [BindNever]
        public Guid UserId { get; set; }
    };

}