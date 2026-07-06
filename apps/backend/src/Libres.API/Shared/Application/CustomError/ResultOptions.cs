using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Libres.API.Shared.Application.CustomError
{
    public class ResultOptions
    {
        public bool IsSuccess { get; set; }
        public string ErrorMessage { get; set; } = string.Empty;
        public int StatusCode { get; set; }


    }
    public class ResultOptions<T> : ResultOptions
    {
        public T? Value { get; set; }

    }
}