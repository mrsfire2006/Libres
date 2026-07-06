using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Libres.API.Data.Persistence;
using Libres.API.Features.Users.Application.Common;
using Libres.API.Shared.Application.CustomError;
using Libres.API.Shared.Application.Mediator;
using Libres.API.Shared.Application.Services;
using Microsoft.EntityFrameworkCore;

namespace Libres.API.Features.Users.Application.Queries.Profile
{
    public class ProfileRequestQueryHandler : ICustomRequestHandler<ProfileRequestQuery, Result<UserProfileResponse>>
    {
        private readonly FileService _fileService;
        public readonly AppDbContext _context;
        public ProfileRequestQueryHandler(AppDbContext context, FileService fileService)
        {
            _context = context;
            _fileService = fileService;
        }

        public async Task<Result<UserProfileResponse>> HandleAsync(ProfileRequestQuery request, CancellationToken cancellationToken)
        {
            var user = await _context.Users
                        .Where(x => x.Id == request.UserId)
                        .Select(u => new UserProfileResponse(
                            u.Id,
                            u.UserName!,
                            u.Email!,
                            u.Image != null ? $"{_fileService.GetBaseUrl()}/{u.Image}" : null,
                            u.Roles.ToString(),
                            _context.Wallets.Where(w => w.UserId == u.Id).Select(w => w.Balance).FirstOrDefault() // Left Join ذكي وتلقائي
                        ))
                        .FirstOrDefaultAsync(cancellationToken);

            if (user == null)
            {
                return new ResultBuilder<UserProfileResponse>().WithFailure("User not found").Build();

            }
            return new ResultBuilder<UserProfileResponse>().WithSuccess(user).Build();


        }
    }
}