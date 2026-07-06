using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Libres.API.Common;
using Libres.API.Features.Users.Application.Commands.Edit;
using Libres.API.Features.Users.Application.Commands.Login;
using Libres.API.Features.Users.Application.Commands.Logout;
using Libres.API.Features.Users.Application.Commands.Register;
using Libres.API.Features.Users.Application.Commands.UpdatePassword;
using Libres.API.Features.Users.Application.Common;
using Libres.API.Features.Users.Application.Queries.Profile;
using Libres.API.Shared.Application.CustomError;
using Libres.API.Shared.Application.Mediator;
using Libres.API.Shared.Domain.Enums;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Libres.API.Controllers
{
    [Route("user")]
    public class UserController : ApiControllerBase
    {
        private readonly CustomMediator _mediator;


        public UserController(CustomMediator mediator)
        {
            _mediator = mediator;
        }
        [HttpPost("register")]
        [ProducesResponseType(typeof(Result<SigninResponse>), StatusCodes.Status200OK)]
        public async Task<IActionResult> Register([FromBody] RegisterRequestCommand request, CancellationToken cancellationToken = default)
        {
            var role = User.FindFirst(System.Security.Claims.ClaimTypes.Role)?.Value;

            if (Enum.TryParse(role, out UserRoles Role))
            {
                request.CurrentUserRole = Role;
            }

            var result = await _mediator.SendAsync(request, cancellationToken);

            return HandleResult(result);
        }



        [HttpPost("login")]
        [ProducesResponseType(typeof(Result<SigninResponse>), StatusCodes.Status200OK)]
        public async Task<IActionResult> Login([FromBody] LoginRequestCommand request, CancellationToken cancellationToken = default)
        {
            var result = await _mediator.SendAsync(request, cancellationToken);

            return HandleResult(result);
        }

        [HttpPut("password")]
        [Authorize]
        [ProducesResponseType(typeof(Result<string>), StatusCodes.Status200OK)]
        public async Task<IActionResult> ChangePassword([FromBody] UpdatePasswordRequestCommand request, CancellationToken cancellationToken = default)
        {
            var userId = User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value;

            if (!Guid.TryParse(userId, out Guid UserId))
            {
                HandleResult(new ResultBuilder<string>().WithFailure("User not found").Build());

            }
            request.UserId = UserId;
            var result = await _mediator.SendAsync(request, cancellationToken);

            return HandleResult(result);
        }



        [HttpPost("logout")]
        [ProducesResponseType(typeof(Result<SigninResponse>), StatusCodes.Status200OK)]
        public async Task<IActionResult> Logout(CancellationToken cancellationToken = default)
        {
            var userId = User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value;

            if (!Guid.TryParse(userId, out Guid UserId))
            {
                HandleResult(new ResultBuilder<string>().WithFailure("User not found").Build());


            }

            var request = new LogoutRequestCommand(UserId);


            var result = await _mediator.SendAsync(request, cancellationToken);

            return HandleResult(result);
        }

        [HttpGet("me")]
        [Authorize]
        [ProducesResponseType(typeof(Result<UserProfileResponse>), StatusCodes.Status200OK)]
        public async Task<IActionResult> Profile(CancellationToken cancellationToken = default)
        {
            var userId = User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value;

            if (!Guid.TryParse(userId, out Guid UserId))
            {
                HandleResult(new ResultBuilder<string>().WithFailure("User not found").Build());


            }
            var request = new ProfileRequestQuery(UserId);

            var result = await _mediator.SendAsync(request, cancellationToken);


            return HandleResult(result);
        }

        [HttpPut("edit")]
        [Consumes("multipart/form-data")]
        [Authorize]
        public async Task<IActionResult> EditProfile([FromForm] EditProfileRequestCommand request, CancellationToken cancellationToken = default)
        {

            var userId = User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value;

            if (!Guid.TryParse(userId, out Guid UserId))
            {
                HandleResult(new ResultBuilder<string>().WithFailure("User not found").Build());


            }
            request.UserId = UserId;
            var result = await _mediator.SendAsync(request, cancellationToken);
            return HandleResult(result);
        }

    }
}