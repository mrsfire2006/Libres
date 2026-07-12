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
    public class LogoutRequestCommandHandler : ICustomRequestHandler<LogoutRequestCommand, Result>
    {


        private readonly SignInManager<User> _signInManager;
        private readonly UserManager<User> _userManager;

        public LogoutRequestCommandHandler(SignInManager<User> signInManager, UserManager<User> userManager)
        {
            _userManager = userManager;
            _signInManager = signInManager;
        }
        public async Task<Result> HandleAsync(LogoutRequestCommand request, CancellationToken cancellationToken)
        {
            var user = await _userManager.FindByIdAsync(request.UserId.ToString());

            if (user == null)
            {
                return new ResultBuilder().WithFailure("User not found").Build();

            }
            await _signInManager.SignOutAsync();
            await _userManager.UpdateSecurityStampAsync(user);


            return new ResultBuilder().WithSuccess().Build();

        }
    }
}