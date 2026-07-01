using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Libres.API.Data.Persistence;
using Libres.API.Features.Users.Application.Common;
using Libres.API.Shared.Application.CustomError;
using Libres.API.Shared.Application.Mediator;
using Microsoft.EntityFrameworkCore;

namespace Libres.API.Features.Users.Application.Queries.Profile
{
    public class ProfileRequestQueryHandler : ICustomRequestHandler<ProfileRequestQuery, Result<UserProfileResponse>>
    {

        public readonly AppDbContext _context;
        public ProfileRequestQueryHandler(AppDbContext context)
        {
            _context = context;
        }

        public async Task<Result<UserProfileResponse>> HandleAsync(ProfileRequestQuery request, CancellationToken cancellationToken)
        {
            var user = await _context.Users.FirstOrDefaultAsync(x => x.Id == request.UserId);

            if (user == null)
            {
                return Result<UserProfileResponse>.Failure(Error.NotFound("User not found"));
            }

            return Result<UserProfileResponse>.Success(new UserProfileResponse(user.Id, user.UserName!, user.Email!, user.Image!, user.Roles.ToString()));

        }
    }
}