using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Libres.API.Data.Persistence;
using Libres.API.Features.Users.Application.Common;
using Libres.API.Features.Users.Domain;
using Libres.API.Shared.Application.CustomError;
using Libres.API.Shared.Application.Mediator;
using Libres.API.Shared.Domain.Enums;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace Libres.API.Features.Users.Application.Commands.Register
{
    public class RegisterRequestCommandHandler : ICustomRequestHandler<RegisterRequestCommand, Result<SigninResponse>>
    {
        private readonly AppDbContext _context;
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;
        public RegisterRequestCommandHandler(AppDbContext context, UserManager<User> userManager, SignInManager<User> signInManager)
        {
            _context = context;
            _userManager = userManager;
            _signInManager = signInManager;
        }
        public async Task<Result<SigninResponse>> HandleAsync(RegisterRequestCommand request, CancellationToken cancellationToken)
        {
            var userExists = await _context.Users
                    .AnyAsync(u => u.NormalizedUserName == request.Username.ToUpperInvariant()
                                || u.NormalizedEmail == request.Email.ToUpperInvariant(), cancellationToken);



            if (userExists)
            {
                return Result<SigninResponse>.Failure(Error.Conflict("Username or Email is already used"));

            }

            var role = request.roles;
            if (!Enum.IsDefined<UserRoles>(role))
            {
                return Result<SigninResponse>.Failure(Error.Conflict("Role is not exist"));

            }
            if (role == UserRoles.SuperAdmin)
            {
                return Result<SigninResponse>.Failure(Error.Validation("Cannot create super admin"));

            }

            if (request.CurrentUserRole != null && role == UserRoles.Admin && request.CurrentUserRole != UserRoles.SuperAdmin)
            {

                return Result<SigninResponse>.Failure(Error.Validation("Forbidden User"));
            }





            switch (role)
            {
                case UserRoles.Author:
                    role |= UserRoles.Reader;
                    break;
                default:
                    break;
            }


            var userResult = User.Create(request.Username, request.Email, request.password, null, role);
            var user = userResult.Value!;

            var createResult = await _userManager.CreateAsync(user, request.password);
            if (!createResult.Succeeded)
            {
                var firstError = createResult.Errors.First().Description;
                return Result<SigninResponse>.Failure(Error.Validation(firstError));
            }



            await _signInManager.SignInAsync(user, true);

            return Result<SigninResponse>.Success(new SigninResponse(user.Id));
        }

        private async Task<string?> SaveImageAsync(IFormFile? file, string folder)
        {
            if (file is null) return null;

            var fileName = $"{Guid.NewGuid()}{Path.GetExtension(file.FileName)}";
            var folderPath = Path.Combine("uploads", folder);

            Directory.CreateDirectory(folderPath);

            var fullPath = Path.Combine(folderPath, fileName);
            using var stream = new FileStream(fullPath, FileMode.Create);
            await file.CopyToAsync(stream);

            return $"{folderPath}/{fileName}";
        }
    }
}