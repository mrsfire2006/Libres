using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Libres.API.Common;
using Libres.API.Data.Persistence;
using Libres.API.Features.Books.Application.Common;
using Libres.API.Features.Books.Application.Extensions;
using Libres.API.Features.Books.Domain;
using Libres.API.Shared.Application.CustomError;
using Libres.API.Shared.Application.Mediator;
using Libres.API.Shared.Application.Services;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;

namespace Libres.API.Features.Books.Application.Commands.Create

{
    public class CreateBookRequestHandler : ICustomRequestHandler<CreateBookRequest, Result<CreateBookResponse>>
    {
        private readonly AppDbContext _context;
        private readonly FileService _fileService;
        private readonly IHostEnvironment _environment;

        public CreateBookRequestHandler(AppDbContext context, FileService fileService, IHostEnvironment environment)
        {
            _context = context;
            _fileService = fileService;
            _environment = environment;

        }
        public async Task<Result<CreateBookResponse>> HandleAsync(CreateBookRequest request, CancellationToken cancellationToken)
        {
            string? coverImagePath = null;
            string? filePath = null;

            try
            {
                coverImagePath = await SaveFileAsync(request.CoverImage, "public_files/covers");
                filePath = await SaveFileAsync(request.File, "premium_files");

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
                    return new ResultBuilder<CreateBookResponse>().WithFailure(bookValue.ErrorMessage).Build();

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


                long fileSizeInBytes = 0;
                int pagesCount = 0;
                if (book.FilePath != null)
                {
                    pagesCount = BookExtenstions.GetPdfPageCount(book.FilePath, _environment);
                    fileSizeInBytes = BookExtenstions.GetPdfSize(book.FilePath, _environment);

                }


                return new ResultBuilder<CreateBookResponse>().WithSuccess(new CreateBookResponse

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
        null,
        book.AverageRating,
        pagesCount,
        fileSizeInBytes


     )).Build();
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