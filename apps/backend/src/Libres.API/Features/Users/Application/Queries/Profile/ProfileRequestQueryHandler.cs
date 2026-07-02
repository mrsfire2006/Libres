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
            var user = await _context.Users
                .Where(x => x.Id == request.UserId)
                .GroupJoin(_context.Wallets,
                    u => u.Id,
                    w => w.UserId,
                    (u, wallets) => new { u, wallets })
                .SelectMany(x => x.wallets.DefaultIfEmpty(), (x, wallet) => new UserProfileResponse(
                    x.u.Id,
                    x.u.UserName!,
                    x.u.Email!,
                    x.u.Image,
                    x.u.Roles.ToString(),
                    wallet != null ? wallet.Balance : 0
                ))
                .FirstOrDefaultAsync();

            if (user == null)
            {
                return Result<UserProfileResponse>.Failure(Error.NotFound("User not found"));
            }

            return Result<UserProfileResponse>.Success(user);

        }
    }
}