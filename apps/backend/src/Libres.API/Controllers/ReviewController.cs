using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Libres.API.Common;
using Libres.API.Features.Reviews.Application.Commands.Create;
using Libres.API.Features.Reviews.Application.Queries.AllReviews;
using Libres.API.Shared.Application.CustomError;
using Libres.API.Shared.Application.Mediator;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Libres.API.Controllers
{
    [Route("review")]
    public class ReviewController : ApiControllerBase
    {
        private readonly CustomMediator _mediator;
        public ReviewController(CustomMediator mediator)
        {
            _mediator = mediator;
        }


        [HttpPost("create")]
        [Authorize]
        [ProducesResponseType(typeof(Result), StatusCodes.Status200OK)]
        public async Task<IActionResult> AddReview([FromBody] CreateReviewRequestCommand request, CancellationToken cancellationToken)
        {
            if (EnsureAuthenticatedUser(out var userId) is IActionResult error)
            {
                return error;
            }

            request.UserId = userId;
            var result = await _mediator.SendAsync<CreateReviewRequestCommand, Result>(request, null, cancellationToken);
            return HandleResult(result);
        }


        [HttpGet("reviews")]
        [ProducesResponseType(typeof(Result<IEnumerable<GetReviewResponse>>), StatusCodes.Status200OK)]
        public async Task<IActionResult> GetReviews([FromQuery] GetReviewsRequestQuery request, CancellationToken cancellationToken)
        {

            var result = await _mediator.SendAsync<GetReviewsRequestQuery, Result<IEnumerable<GetReviewResponse>>>(request, null, cancellationToken);
            return HandleResult(result);
        }

    }
}