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
    public class EditProfileRequestCommandHandler : ICustomRequestHandler<EditProfileRequestCommand, Result<string>>
    {
        private readonly AppDbContext _context;
        private readonly UserManager<User> _usermanager;
        private readonly SignInManager<User> _signInManager;

        public EditProfileRequestCommandHandler(
            AppDbContext context,
            UserManager<User> usermanager,
            SignInManager<User> signInManager)
        {
            _context = context;
            _usermanager = usermanager;
            _signInManager = signInManager;
        }

        public async Task<Result<string>> HandleAsync(EditProfileRequestCommand request, CancellationToken cancellationToken)
        {
            if (string.IsNullOrWhiteSpace(request.username))
            {
                return new ResultBuilder<string>().WithFailure("Username cannot be empty.").Build();

            }

            var user = await _usermanager.FindByIdAsync(request.UserId.ToString());
            if (user == null)
            {
                return new ResultBuilder<string>().WithFailure("User not found").Build();

            }

            var usernameResult = user.UpdateUsername(request.username);
            if (usernameResult.IsFailure)
            {
                return new ResultBuilder<string>().WithFailure(usernameResult.ErrorMessage).Build();

            }

            var oldImagePath = user.Image;
            string? newImagePath = null;
            bool shouldDeleteOldImageFile = false;

            await using var transaction = await _context.Database.BeginTransactionAsync(cancellationToken);

            try
            {
                if (request.image is not null)
                {
                    newImagePath = await SaveImageAsync(request.image, "images");
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
                    DeleteFileIfExists(newImagePath);

                    var firstError = identityResult.Errors.First();
                    return new ResultBuilder<string>().WithFailure(firstError.Description).Build();

                }

                await transaction.CommitAsync(cancellationToken);

                if (shouldDeleteOldImageFile)
                {
                    DeleteFileIfExists(oldImagePath);
                }

                await _signInManager.RefreshSignInAsync(user);

                return new ResultBuilder<string>().WithSuccess("Edited").Build();

            }
            catch (DbUpdateException ex)
            {
                await transaction.RollbackAsync(cancellationToken);
                DeleteFileIfExists(newImagePath);

                if (ex.InnerException != null &&
                   (ex.InnerException.Message.Contains("Duplicate") || ex.InnerException.Message.Contains("unique constraint")))
                {
                    return new ResultBuilder<string>().WithFailure("Username is already used").Build();

                }
                return new ResultBuilder<string>().WithFailure("Database update error.").Build();

            }
            catch (Exception ex)
            {
                await transaction.RollbackAsync(cancellationToken);
                DeleteFileIfExists(newImagePath);
                return new ResultBuilder<string>().WithFailure($"unexpected error : {ex.Message}").Build();

            }
        }

        private async Task<string?> SaveImageAsync(IFormFile file, string folder)
        {
            var fileName = $"{Guid.NewGuid()}{Path.GetExtension(file.FileName)}";
            var folderPath = Path.Combine("uploads", folder);

            Directory.CreateDirectory(folderPath);

            var fullPath = Path.Combine(folderPath, fileName);
            await using var stream = new FileStream(fullPath, FileMode.Create);
            await file.CopyToAsync(stream);

            return $"{folderPath}/{fileName}";
        }

        private void DeleteFileIfExists(string? path)
        {
            if (!string.IsNullOrWhiteSpace(path) && File.Exists(path))
                File.Delete(path);
        }
    }
}