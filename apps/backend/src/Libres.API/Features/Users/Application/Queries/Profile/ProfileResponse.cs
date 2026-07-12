using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Libres.API.Features.Users.Application.Queries.Profile
{

    public record ProfileResponse(Guid UserId, string Username, string Email, string? Image, string Roles, decimal Balance = 15);

}