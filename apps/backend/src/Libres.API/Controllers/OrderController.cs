using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Libres.API.Common;
using Libres.API.Features.Orders.Application.Commands.Approve;
using Libres.API.Features.Orders.Application.Commands.Create;
using Libres.API.Features.Orders.Application.Common;
using Libres.API.Shared.Application.CustomError;
using Libres.API.Shared.Application.Mediator;
using Libres.API.Shared.Domain.Enums;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Libres.API.Controllers
{
    [Route("order")]
    public class OrderController : ApiControllerBase
    {
        private readonly CustomMediator _mediator;

        public OrderController(CustomMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpPost("create")]
        [Authorize(Roles = nameof(UserRoles.Reader))]
        [ProducesResponseType(typeof(Result<OrderResponse>), StatusCodes.Status200OK)]

        public async Task<IActionResult> CreateOrder([FromBody] CreateOrderRequestCommand request, CancellationToken cancellationToken)
        {
            var userId = User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value;

            if (!Guid.TryParse(userId, out Guid UserId))
            {
                HandleResult(new ResultBuilder().WithFailure("User not found").Build());

            }
            request.UserId = UserId;


            var result = await _mediator.SendAsync(request, cancellationToken);

            return HandleResult(result);
        }

        [HttpPost("approve")]
        [Authorize(Roles = $"{nameof(UserRoles.Admin)},{nameof(UserRoles.SuperAdmin)}")]
        [ProducesResponseType(typeof(Result), StatusCodes.Status200OK)]

        public async Task<IActionResult> ApproveOrder([FromBody] ApproveOrderCommand request, CancellationToken cancellationToken)
        {

            var result = await _mediator.SendAsync(request, cancellationToken);

            return HandleResult(result);
        }


    }
}