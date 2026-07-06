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


            var errorResponse = Result<object>.Failure(result.ErrorMessage, result.StatusCode);

            return StatusCode((int)result.StatusCode, errorResponse);

        }
        protected IActionResult HandleResult(Result result)
        {
            if (result.IsSuccess)
            {
                return Ok(result);
            }


            var errorResponse = Result.Failure(result.ErrorMessage, result.StatusCode);

            return StatusCode((int)result.StatusCode, errorResponse);

        }
    }
}