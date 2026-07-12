using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Libres.API.Common;
using Libres.API.Features.Books.Application.Common;
using Libres.API.Features.Users.Application.Commands.Edit;
using Libres.API.Features.Users.Application.Commands.Login;
using Libres.API.Features.Users.Application.Commands.Logout;
using Libres.API.Features.Users.Application.Commands.Register;
using Libres.API.Features.Users.Application.Commands.UpdatePassword;
using Libres.API.Features.Users.Application.Common;
using Libres.API.Features.Users.Application.Queries.Profile;
using Libres.API.Shared.Application.CustomError;
using Libres.API.Shared.Application.Mediator;
using Libres.API.Shared.Application.PipLines;
using Libres.API.Shared.Application.RequestBuilder;
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
            Action<RequestPipelineBuilder<RegisterRequestCommand, Result<SigninResponse>>> steps = (step) =>
            {
                step.AddStep(new ValidationStep<RegisterRequestCommand, Result<SigninResponse>>(new RegisterRequestCommandValidator()));
            };
            var result = await _mediator.SendAsync(request, steps, cancellationToken);

            return HandleResult(result);
        }



        [HttpPost("login")]
        [ProducesResponseType(typeof(Result<SigninResponse>), StatusCodes.Status200OK)]
        public async Task<IActionResult> Login([FromBody] LoginRequestCommand request, CancellationToken cancellationToken = default)
        {
            Action<RequestPipelineBuilder<LoginRequestCommand, Result<SigninResponse>>> steps = (step) =>
{
    step.AddStep(new ValidationStep<LoginRequestCommand, Result<SigninResponse>>(new LoginRequestCommandValidator()));
};
            var result = await _mediator.SendAsync<LoginRequestCommand, Result<SigninResponse>>(request, steps, cancellationToken);

            return HandleResult(result);
        }

        [HttpPut("password")]
        [Authorize]
        [ProducesResponseType(typeof(Result), StatusCodes.Status200OK)]

        public async Task<IActionResult> ChangePassword([FromBody] UpdatePasswordRequestCommand request, CancellationToken cancellationToken = default)
        {
            if (EnsureAuthenticatedUser(out var userId) is IActionResult error)
            {
                return error;
            }

            request.UserId = userId;
            var result = await _mediator.SendAsync<UpdatePasswordRequestCommand, Result>(request, null, cancellationToken);
            return HandleResult(result);
        }



        [HttpPost("logout")]
        [Authorize]
        [ProducesResponseType(typeof(Result), StatusCodes.Status200OK)]
        public async Task<IActionResult> Logout(CancellationToken cancellationToken = default)
        {
            if (EnsureAuthenticatedUser(out var userId) is IActionResult error)
            {
                return error;
            }

            var request = new LogoutRequestCommand(userId);
            var result = await _mediator.SendAsync<LogoutRequestCommand, Result>(request, null, cancellationToken);
            return HandleResult(result);
        }

        [HttpGet("me")]
        [Authorize]
        [ProducesResponseType(typeof(Result<ProfileResponse>), StatusCodes.Status200OK)]
        public async Task<IActionResult> Profile(CancellationToken cancellationToken = default)
        {
            if (EnsureAuthenticatedUser(out var userId) is IActionResult error)
            {
                return error;
            }

            var request = new ProfileRequestQuery(userId);
            var result = await _mediator.SendAsync<ProfileRequestQuery, Result<ProfileResponse>>(request, null, cancellationToken);
            return HandleResult(result);
        }


        [HttpPut("edit")]
        [Consumes("multipart/form-data")]
        [Authorize]

        public async Task<IActionResult> EditProfile([FromForm] EditProfileRequestCommand request, CancellationToken cancellationToken = default)
        {
            if (EnsureAuthenticatedUser(out var userId) is IActionResult error)
            {
                return error;
            }

            request.UserId = userId;
            var result = await _mediator.SendAsync<EditProfileRequestCommand, Result>(request, null, cancellationToken);
            return HandleResult(result);
        }

    }
}