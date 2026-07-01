using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Libres.API.Shared.Application.CustomError
{
    public record Error(string Message, ErrorType Type)
    {
        public static readonly Error None = new(string.Empty, ErrorType.None);
        public static Error Validation(string message) => new(message, ErrorType.Validation);
        public static Error NotFound(string message) => new(message, ErrorType.NotFound);
        public static Error Unauthorized(string message) => new(message, ErrorType.Unauthorized);
        public static Error Conflict(string message) => new(message, ErrorType.Conflict);

    }
}