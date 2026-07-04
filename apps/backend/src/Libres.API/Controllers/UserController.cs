using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Libres.API.Common;
using Libres.API.Features.Users.Application.Commands.Edit;
using Libres.API.Features.Users.Application.Commands.Login;
using Libres.API.Features.Users.Application.Commands.Logout;
using Libres.API.Features.Users.Application.Commands.Register;
using Libres.API.Features.Users.Application.Common;
using Libres.API.Features.Users.Application.Queries.Profile;
using Libres.API.Shared.Application.CustomError;
using Libres.API.Shared.Application.Mediator;
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



        [HttpPost("logout")]
        [ProducesResponseType(typeof(Result<SigninResponse>), StatusCodes.Status200OK)]
        public async Task<IActionResult> Logout(CancellationToken cancellationToken = default)
        {
            var userId = User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value;

            if (!Guid.TryParse(userId, out Guid UserId))
            {
                return HandleResult(Result<string>.Failure(Error.NotFound("User not found")));

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
                return HandleResult(Result<string>.Failure(Error.NotFound("User not found")));

            }
            var request = new ProfileRequestQuery(UserId);

            var result = await _mediator.SendAsync(request, cancellationToken);


            return HandleResult(result);
        }

        [HttpPut("edit")]
        [Authorize]
        public async Task<IActionResult> EditProfile([FromBody] EditProfileCommand request, CancellationToken cancellationToken = default)
        {

            var userId = User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value;

            if (!Guid.TryParse(userId, out Guid UserId))
            {
                return HandleResult(Result<string>.Failure(Error.NotFound("User not found")));

            }
            request.UserId = UserId;
            var result = await _mediator.SendAsync(request, cancellationToken);
            return HandleResult(result);
        }

    }
}