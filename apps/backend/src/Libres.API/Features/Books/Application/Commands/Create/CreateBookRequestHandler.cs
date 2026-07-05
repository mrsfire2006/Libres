using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Libres.API.Common;
using Libres.API.Data.Persistence;
using Libres.API.Features.Books.Application.Common;
using Libres.API.Features.Books.Domain;
using Libres.API.Shared.Application.CustomError;
using Libres.API.Shared.Application.Mediator;
using Libres.API.Shared.Application.Services;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;

namespace Libres.API.Features.Books.Application.Commands.Create

{
    public class CreateBookRequestHandler : ICustomRequestHandler<CreateBookRequest, Result<BookResponse>>
    {
        private readonly AppDbContext _context;
        private readonly FileService _fileService;

        public CreateBookRequestHandler(AppDbContext context, FileService fileService)
        {
            _context = context;
            _fileService = fileService;

        }
        public async Task<Result<BookResponse>> HandleAsync(CreateBookRequest request, CancellationToken cancellationToken)
        {
            string? coverImagePath = null;
            string? filePath = null;

            try
            {
                coverImagePath = await SaveFileAsync(request.CoverImage, "covers");
                filePath = await SaveFileAsync(request.File, "files");

                var bookValue = Book.Create(
                    request.Title,
                    request.UserId,
                    request.CategoryId,
                    request.Price,
                    request.Description,
                    coverImagePath,
                    filePath
                );

                if (bookValue.IsFailure)
                {
                    DeleteFileIfExists(coverImagePath);
                    DeleteFileIfExists(filePath);
                    return Result<BookResponse>.Failure(bookValue.Error);
                }

                var book = bookValue.Value!;
                _context.Add(book);
                await _context.SaveChangesAsync();

                var details = await (from u in _context.Users.AsNoTracking()
                                     where u.Id == book.UserId

                                     join c in _context.Categories.AsNoTracking()
                                     on book.CategoryId equals c.Id into categoryGroup
                                     from subCategory in categoryGroup.DefaultIfEmpty()

                                     select new
                                     {
                                         UserName = u.UserName,
                                         CategoryName = subCategory != null ? subCategory.Name : null
                                     })
                                     .FirstOrDefaultAsync(cancellationToken);

                return Result<BookResponse>.Success(new BookResponse

     (
         book.Id,
         book.Title,
         details?.UserName ?? "",
         book.UserId,
         book.CategoryId,
         details?.CategoryName ?? "",
         book.Price,
         book.BookStatus.ToString(),
         book.Order,
         book.Description,
         book.CreatedAt,
         book.CoverImagePath != null ? $"{_fileService.GetBaseUrl()}/{book.CoverImagePath}" : null,
         book.FilePath != null ? $"{_fileService.GetBaseUrl()}/{book.FilePath}" : null
     ));
            }
            catch (Exception)
            {
                DeleteFileIfExists(coverImagePath);
                DeleteFileIfExists(filePath);
                throw;
            }
        }

        private async Task<string?> SaveFileAsync(IFormFile? file, string folder)
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
        private void DeleteFileIfExists(string? path)
        {
            if (path is not null && File.Exists(path))
                File.Delete(path);
        }

    }
}