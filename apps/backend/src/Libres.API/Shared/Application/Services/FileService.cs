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
                return $"{request.Scheme}://{request.Host}{request.PathBase}";
            }

            return "http://localhost:5045";
        }

        public string GetAbsoluteUrl(string fileName)
        {
            return $"{GetBaseUrl()}/uploads/{fileName}";
        }
    }
}