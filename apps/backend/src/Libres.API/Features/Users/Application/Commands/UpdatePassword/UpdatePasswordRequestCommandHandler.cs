using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Libres.API.Data.Persistence;
using Libres.API.Features.Users.Domain;
using Libres.API.Shared.Application.CustomError;
using Libres.API.Shared.Application.Mediator;
using Microsoft.AspNetCore.Identity;

namespace Libres.API.Features.Users.Application.Commands.UpdatePassword
{
    public class UpdatePasswordRequestCommandHandler : ICustomRequestHandler<UpdatePasswordRequestCommand, Result<string>>
    {
        private readonly AppDbContext _context;
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;

        public UpdatePasswordRequestCommandHandler(
            AppDbContext context,
            UserManager<User> userManager,
            SignInManager<User> signInManager)
        {
            _context = context;
            _userManager = userManager;
            _signInManager = signInManager;
        }
        public async Task<Result<string>> HandleAsync(UpdatePasswordRequestCommand request, CancellationToken cancellationToken)
        {
            var user = await _userManager.FindByIdAsync(request.UserId.ToString());
            if (user == null)
            {
                return Result<string>.Failure(Error.NotFound("User not found"));
            }

            var changePasswordResult = await _userManager.ChangePasswordAsync(user, request.CurrentPassword, request.NewPassword);

            if (!changePasswordResult.Succeeded)
            {
                var firstError = changePasswordResult.Errors.FirstOrDefault()?.Description ?? "Failed to change password";
                
                return Result<string>.Failure(Error.Validation(firstError));
            }

            await _signInManager.RefreshSignInAsync(user);

            return Result<string>.Success("Password updated");
        }
    }
}