using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Libres.API.Shared.Application.RequestBuilder
{
    public class RequestOptions
    {
        public bool IsValidationEnabled { get; set; } = true;
        public bool IsLoggingEnabled { get; set; } = false;

    }
}