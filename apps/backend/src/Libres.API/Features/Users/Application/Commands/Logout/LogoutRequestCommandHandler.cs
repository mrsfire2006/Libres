using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Libres.API.Features.Users.Application.Common;
using Libres.API.Features.Users.Domain;
using Libres.API.Shared.Application.CustomError;
using Libres.API.Shared.Application.Mediator;
using Microsoft.AspNetCore.Identity;

namespace Libres.API.Features.Users.Application.Commands.Logout
{
    public class LogoutRequestCommandHandler : ICustomRequestHandler<LogoutRequestCommand, Result<string>>
    {


        private readonly SignInManager<User> _signInManager;
        private readonly UserManager<User> _userManager;

        public LogoutRequestCommandHandler(SignInManager<User> signInManager, UserManager<User> userManager)
        {
            _userManager = userManager;
            _signInManager = signInManager;
        }
        public async Task<Result<string>> HandleAsync(LogoutRequestCommand request, CancellationToken cancellationToken)
        {
            var user = await _userManager.FindByIdAsync(request.UserId.ToString());
            
            if (user == null)
            {
                return Result<string>.Failure(Error.NotFound("User not found"));
            }
            await _signInManager.SignOutAsync();
            await _userManager.UpdateSecurityStampAsync(user);

            return Result<string>.Success("logged out");
        }
    }
}