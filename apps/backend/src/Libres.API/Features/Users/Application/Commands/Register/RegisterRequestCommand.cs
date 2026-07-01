using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;
using Libres.API.Features.Users.Application.Common;
using Libres.API.Shared.Application.CustomError;
using Libres.API.Shared.Application.Mediator;
using Libres.API.Shared.Domain.Enums;

namespace Libres.API.Features.Users.Application.Commands.Register
{
    public record RegisterRequestCommand(string Username, string Email, string password, string? PhoneNumber, UserRoles roles = UserRoles.Reader) : ICustomRequest<Result<SigninResponse>>
    {
        [JsonIgnore]
        public UserRoles? CurrentUserRole { get; set; }
    };

}