using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using Libres.API.Shared.Application.CustomError;
using Microsoft.AspNetCore.Mvc;

namespace Libres.API.Common
{
    [ApiController]
    public class ApiControllerBase : ControllerBase
    {
        protected IActionResult HandleResult<T>(Result<T> result)
        {
            if (result.IsSuccess)
            {
                return Ok(result);
            }
            var statusCode = result.Error.Type switch
            {
                ErrorType.NotFound => HttpStatusCode.NotFound,         // 404
                ErrorType.Unauthorized => HttpStatusCode.Unauthorized, // 401
                ErrorType.Conflict => HttpStatusCode.Conflict,         // 409

                ErrorType.Forbidden => HttpStatusCode.Forbidden,

                ErrorType.Validation => HttpStatusCode.BadRequest,     // 400
                _ => HttpStatusCode.BadRequest                         // 400
            };

            var errorResponse = Result<object>.Failure(result.Error);
            return StatusCode((int)statusCode, errorResponse);

        }
    }
}