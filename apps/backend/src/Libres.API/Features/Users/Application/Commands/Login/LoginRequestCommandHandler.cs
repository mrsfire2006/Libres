using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Libres.API.Features.Users.Application.Common;
using Libres.API.Features.Users.Domain;
using Libres.API.Shared.Application.CustomError;
using Libres.API.Shared.Application.Mediator;
using Microsoft.AspNetCore.Identity;

namespace Libres.API.Features.Users.Application.Commands.Login
{
    public class LoginRequestCommandHandler : ICustomRequestHandler<LoginRequestCommand, Result<SigninResponse>>
    {

        private readonly SignInManager<User> _signInManager;
        private readonly UserManager<User> _userManager;

        public LoginRequestCommandHandler(SignInManager<User> signInManager, UserManager<User> userManager)
        {
            _userManager = userManager;
            _signInManager = signInManager;
        }
        public async Task<Result<SigninResponse>> HandleAsync(LoginRequestCommand request, CancellationToken cancellationToken)
        {
            var user = await _userManager.FindByEmailAsync(request.Email);

            if (user == null)
            {
                return Result<SigninResponse>.Failure(Error.Validation("Invalid email or password."));
            }

            var result = await _signInManager.PasswordSignInAsync(user.UserName!, request.Password, isPersistent: true, lockoutOnFailure: false);

            if (!result.Succeeded)
            {

                return Result<SigninResponse>.Failure(Error.Validation("Invalid email or password."));
            }


            return Result<SigninResponse>.Success(new SigninResponse(
                user.Id));
        }
    }
}
