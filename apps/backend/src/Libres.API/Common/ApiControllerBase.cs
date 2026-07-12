using System;
using System.Collections.Generic;
using System.Diagnostics.CodeAnalysis;
using System.Linq;
using System.Net;
using System.Security.Claims;
using System.Threading.Tasks;
using Libres.API.Shared.Application.CustomError;
using Microsoft.AspNetCore.Http;
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
                return result.StatusCode == StatusCodes.Status200OK
                    ? Ok(result)
                    : StatusCode(result.StatusCode, result);
            }

            var errorResponse = Result<object>.Failure(result.ErrorMessage, result.StatusCode);
            return StatusCode(result.StatusCode, errorResponse);
        }

        protected IActionResult HandleResult(Result result)
        {
            if (result.IsSuccess)
            {
                return result.StatusCode == StatusCodes.Status200OK
                    ? Ok(result)
                    : StatusCode(result.StatusCode, result);
            }

            var errorResponse = Result.Failure(result.ErrorMessage, result.StatusCode);
            return StatusCode(result.StatusCode, errorResponse);
        }

        protected bool TryGetCurrentUserId([NotNullWhen(true)] out Guid userId)
        {
            var userIdValue = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            return Guid.TryParse(userIdValue, out userId);
        }

        protected IActionResult? EnsureAuthenticatedUser(out Guid userId)
        {
            if (TryGetCurrentUserId(out userId))
            {
                return null;
            }

            userId = Guid.Empty;
            
            return Unauthorized(Result.Failure("User not found", StatusCodes.Status401Unauthorized));
        }
    }
}