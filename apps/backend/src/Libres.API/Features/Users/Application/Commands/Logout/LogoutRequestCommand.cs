using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;
using Libres.API.Shared.Application.CustomError;
using Libres.API.Shared.Application.Mediator;
using Libres.API.Shared.Application.RequestBuilder;

namespace Libres.API.Features.Users.Application.Commands.Logout
{
    public record LogoutRequestCommand : ICustomRequest<Result>
    {
        [JsonIgnore]
        public readonly Guid UserId;
        public LogoutRequestCommand(Guid userId)
        {
            UserId = userId;
        }


    };


}