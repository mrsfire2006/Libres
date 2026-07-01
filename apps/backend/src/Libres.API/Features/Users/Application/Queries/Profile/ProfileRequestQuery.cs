using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;
using Libres.API.Features.Users.Application.Common;
using Libres.API.Shared.Application.CustomError;
using Libres.API.Shared.Application.Mediator;

namespace Libres.API.Features.Users.Application.Queries.Profile
{
    public record ProfileRequestQuery : ICustomRequest<Result<UserProfileResponse>>
    {
        [JsonIgnore]
        public readonly Guid UserId;

        public ProfileRequestQuery(Guid userId)
        {
            UserId = userId;
        }
    };

}