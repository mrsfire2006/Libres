using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Libres.API.Data.Persistence;
using Libres.API.Features.Users.Application.Common;
using Libres.API.Features.Users.Domain;
using Libres.API.Shared.Application.CustomError;
using Libres.API.Shared.Application.Mediator;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace Libres.API.Features.Users.Application.Commands.Edit
{
    public class EditProfileCommandHandler : ICustomRequestHandler<EditProfileCommand, Result<string>>
    {
        private readonly AppDbContext _context;
        private readonly UserManager<User> _usermanager;
        private readonly SignInManager<User> _signInManager;

        public EditProfileCommandHandler(
            AppDbContext context,
            UserManager<User> usermanager,
            SignInManager<User> signInManager)
        {
            _context = context;
            _usermanager = usermanager;
            _signInManager = signInManager;
        }

        public async Task<Result<string>> HandleAsync(EditProfileCommand request, CancellationToken cancellationToken)
        {
            if (string.IsNullOrWhiteSpace(request.username))
            {
                return Result<string>.Failure(Error.Validation("Username cannot be empty."));

            }
            var user = await _usermanager.FindByIdAsync(request.UserId.ToString());
            if (user == null)
            {
                return Result<string>.Failure(Error.NotFound("User not found"));
            }
            var result = user.UpdateUsername(request.username);

            if (result.IsFailure)
            {
                return Result<string>.Failure(result.Error);

            }
            try
            {
                var identityResult = await _usermanager.UpdateAsync(user);

                if (!identityResult.Succeeded)
                {
                    var firstError = identityResult.Errors.First();
                    return Result<string>.Failure(Error.Conflict(firstError.Description));
                }

                await _signInManager.RefreshSignInAsync(user);


                return Result<string>.Success("Edited");
            }
            catch (DbUpdateException ex)
            {
                if (ex.InnerException != null &&
                   (ex.InnerException.Message.Contains("Duplicate") || ex.InnerException.Message.Contains("unique constraint")))
                {
                    return Result<string>.Failure(Error.Validation("Username is already used"));
                }

                return Result<string>.Failure(Error.Conflict("Database update error."));
            }
            catch (Exception ex)
            {
                return Result<string>.Failure(Error.Conflict($"حدث خطأ غير متوقع: {ex.Message}"));
            }


        }
    }
}