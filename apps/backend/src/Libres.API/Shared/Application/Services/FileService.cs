using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Libres.API.Common;
using Microsoft.Extensions.Options;

namespace Libres.API.Shared.Application.Services
{
    public class FileService
    {
        private readonly StorageOptions _options;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public FileService(IOptions<StorageOptions> options, IHttpContextAccessor httpContextAccessor)
        {
            _options = options.Value;
            _httpContextAccessor = httpContextAccessor;
        }

        public string GetBaseUrl()
        {
            if (!string.IsNullOrEmpty(_options.BaseUrl))
            {
                return _options.BaseUrl;
            }


            var request = _httpContextAccessor.HttpContext?.Request;
            if (request != null)
            {
                var forwardedHost = request.Headers["X-Forwarded-Host"].FirstOrDefault();
                var forwardedProto = request.Headers["X-Forwarded-Proto"].FirstOrDefault();

                var host = !string.IsNullOrEmpty(forwardedHost) ? forwardedHost : request.Host.ToString();
                var scheme = !string.IsNullOrEmpty(forwardedProto) ? forwardedProto : request.Scheme;
                return $"{scheme}://{host}{request.PathBase}";
            }




            return "http://localhost:5045";
        }

        public string GetAbsoluteUrl(string fileName)
        {
            return $"{GetBaseUrl()}/uploads/{fileName}";
        }

        public async Task<string?> SaveImageAsync(IFormFile file, string folder)
        {
            var fileName = $"{Guid.NewGuid()}{Path.GetExtension(file.FileName)}";
            var folderPath = Path.Combine("uploads", folder);

            Directory.CreateDirectory(folderPath);

            var fullPath = Path.Combine(folderPath, fileName);
            await using var stream = new FileStream(fullPath, FileMode.Create);
            await file.CopyToAsync(stream);

            return $"{folderPath}/{fileName}";
        }

        public void DeleteFileIfExists(string? path)
        {
            if (!string.IsNullOrWhiteSpace(path) && File.Exists(path))
                File.Delete(path);
        }
    }
}