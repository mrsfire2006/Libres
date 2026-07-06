using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Libres.API.Shared.Application.CustomError
{
    public class Result
    {
        public bool IsSuccess { get; }
        public bool IsFailure => !IsSuccess;
        public string ErrorMessage { get; protected set; } = string.Empty;
        public int StatusCode { get; }

        protected Result(bool isSuccess, string errorMessage, int statusCode)
        {
            IsSuccess = isSuccess;
            ErrorMessage = errorMessage;
            StatusCode = statusCode;
        }

        public static Result Success(int statusCode = 200)
           => new(true, string.Empty, statusCode);

        public static Result Failure(string errorMessage, int statusCode = 400)
            => new(false, errorMessage, statusCode);
    }
    public class Result<T> : Result
    {
        public T? Value { get; }

        protected Result(bool isSuccess, T? value, string errorMessage, int statusCode)
                : base(isSuccess, errorMessage, statusCode)
        {
            Value = value;
        }

        public static Result<T> Success(T? value, int statusCode = 200) => new(true, value, string.Empty, statusCode);
        public new static Result<T> Failure(string errorMessage, int statusCode = 400)
                => new(false, default, errorMessage, statusCode);
    }
}