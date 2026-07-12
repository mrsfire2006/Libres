using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Libres.API.Data.Persistence;
using Libres.API.Features.Users.Application.Common;
using Libres.API.Features.Users.Domain;
using Libres.API.Shared.Application.CustomError;
using Libres.API.Shared.Application.Mediator;
using Libres.API.Shared.Application.Services;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace Libres.API.Features.Users.Application.Commands.Edit
{
    public class EditProfileRequestCommandHandler : ICustomRequestHandler<EditProfileRequestCommand, Result>
    {
        private readonly AppDbContext _context;
        private readonly UserManager<User> _usermanager;
        private readonly SignInManager<User> _signInManager;
        private readonly FileService _fileService;

        public EditProfileRequestCommandHandler(
            AppDbContext context,
            UserManager<User> usermanager,
            SignInManager<User> signInManager,
            FileService fileService)
        {
            _context = context;
            _usermanager = usermanager;
            _signInManager = signInManager;
            _fileService = fileService;
        }

        public async Task<Result> HandleAsync(EditProfileRequestCommand request, CancellationToken cancellationToken)
        {
            if (string.IsNullOrWhiteSpace(request.username))
            {
                return new ResultBuilder().WithFailure("Username cannot be empty.").Build();

            }

            var user = await _usermanager.FindByIdAsync(request.UserId.ToString());
            if (user == null)
            {
                return new ResultBuilder().WithFailure("User not found").Build();

            }

            var usernameResult = user.UpdateUsername(request.username);
            if (usernameResult.IsFailure)
            {
                return new ResultBuilder().WithFailure(usernameResult.ErrorMessage).Build();

            }

            var oldImagePath = user.Image;
            string? newImagePath = null;
            bool shouldDeleteOldImageFile = false;

            await using var transaction = await _context.Database.BeginTransactionAsync(cancellationToken);

            try
            {
                if (request.image is not null)
                {
                    newImagePath = await _fileService.SaveImageAsync(request.image, "images");
                    user.UpdateImage(newImagePath);
                    shouldDeleteOldImageFile = !string.IsNullOrWhiteSpace(oldImagePath);
                }
                else if (request.deleteCurrentImage)
                {
                    user.UpdateImage(null);
                    shouldDeleteOldImageFile = !string.IsNullOrWhiteSpace(oldImagePath);
                }

                var identityResult = await _usermanager.UpdateAsync(user);

                if (!identityResult.Succeeded)
                {
                    await transaction.RollbackAsync(cancellationToken);
                    _fileService.DeleteFileIfExists(newImagePath);

                    var firstError = identityResult.Errors.First();
                    return new ResultBuilder().WithFailure(firstError.Description).Build();

                }

                await transaction.CommitAsync(cancellationToken);

                if (shouldDeleteOldImageFile)
                {
                    _fileService.DeleteFileIfExists(oldImagePath);
                }

                await _signInManager.RefreshSignInAsync(user);

                return new ResultBuilder().WithSuccess().Build();

            }
            catch (DbUpdateException ex)
            {
                await transaction.RollbackAsync(cancellationToken);
                _fileService.DeleteFileIfExists(newImagePath);

                if (ex.InnerException != null &&
                   (ex.InnerException.Message.Contains("Duplicate") || ex.InnerException.Message.Contains("unique constraint")))
                {
                    return new ResultBuilder().WithFailure("Username is already used").Build();

                }
                return new ResultBuilder().WithFailure("Database update error.").Build();

            }
            catch (Exception ex)
            {
                await transaction.RollbackAsync(cancellationToken);
                _fileService.DeleteFileIfExists(newImagePath);
                return new ResultBuilder().WithFailure($"unexpected error : {ex.Message}").Build();

            }
        }


    }
}