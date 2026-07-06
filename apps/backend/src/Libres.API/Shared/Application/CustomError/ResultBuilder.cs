using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Libres.API.Shared.Application.CustomError
{
    public class ResultBuilder
    {
        private readonly ResultOptions _options = new ResultOptions();
        public ResultBuilder WithSuccess(int statusCode = 200)
        {
            _options.IsSuccess = true;
            _options.ErrorMessage = string.Empty;
            _options.StatusCode = statusCode;
            return this;
        }

        public ResultBuilder WithFailure(string errorMessage, int statusCode = 400)
        {
            _options.IsSuccess = false;
            _options.ErrorMessage = errorMessage;
            _options.StatusCode = statusCode;
            return this;
        }
        public Result Build()
        {

            switch (_options.IsSuccess)
            {
                case true:
                    return Result.Success();
                case false:
                    return Result.Failure(_options.ErrorMessage, _options.StatusCode);
            }

        }
    }
    public class ResultBuilder<T> : ResultBuilder
    {
        private readonly ResultOptions<T> _options = new ResultOptions<T>();


        public ResultBuilder<T> WithSuccess(T? value, int statusCode = 200)
        {
            _options.IsSuccess = true;
            _options.Value = value;
            _options.ErrorMessage = string.Empty;
            _options.StatusCode = statusCode;
            return this;
        }
        public new ResultBuilder<T> WithFailure(string errorMessage, int statusCode = 400)
        {
            _options.IsSuccess = false;
            _options.Value = default;
            _options.ErrorMessage = errorMessage;
            _options.StatusCode = statusCode;
            return this;
        }

        public new Result<T> Build()
        {

            switch (_options.IsSuccess)
            {
                case true:
                    return Result<T>.Success(_options.Value);
                case false:
                    return Result<T>.Failure(_options.ErrorMessage, _options.StatusCode);
            }

        }
    }
}