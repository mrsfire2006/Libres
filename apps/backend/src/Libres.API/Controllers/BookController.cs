
using Libres.API.Common;
using Libres.API.Features.Books.Application.Commands.Create;
using Libres.API.Features.Books.Application.Commands.CreateReview;
using Libres.API.Features.Books.Application.Commands.Delete;
using Libres.API.Features.Books.Application.Commands.Edit;
using Libres.API.Features.Books.Application.Commands.UpdateStatus;
using Libres.API.Features.Books.Application.Common;
using Libres.API.Features.Books.Application.Queries.Book;
using Libres.API.Features.Books.Application.Queries.Books;
using Libres.API.Shared.Application.CustomError;
using Libres.API.Shared.Application.Mediator;
using Libres.API.Shared.Domain.Enums;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.CodeAnalysis.CodeFixes;

namespace Libres.API.Controllers
{
    [Route("book")]
    public class BookController : ApiControllerBase
    {
        private readonly CustomMediator _mediator;

        public BookController(CustomMediator mediator)
        {
            _mediator = mediator;
        }



        [HttpPost("upload")]
        [Consumes("multipart/form-data")]
        [Authorize(Roles = nameof(UserRoles.Author))]
        [ProducesResponseType(typeof(Result<BookResponse>), StatusCodes.Status200OK)]
        public async Task<IActionResult> CreateBook([FromForm] CreateBookRequest request, CancellationToken cancellationToken)
        {
            var userId = User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value;
            request.UserId = Guid.Parse(userId!);

            var result = await _mediator.SendAsync(request, cancellationToken);

            return HandleResult(result);
        }
        [HttpPost("edit")]
        [Authorize(Roles = nameof(UserRoles.Author))]
        [ProducesResponseType(typeof(Result<BookResponse>), StatusCodes.Status200OK)]
        public async Task<IActionResult> EditBook([FromForm] EditBookRequestCommand request, CancellationToken cancellationToken)
        {
            var result = await _mediator.SendAsync(request, cancellationToken);
            return HandleResult(result);
        }


        [HttpPost("delete")]
        [Authorize(Roles = $"{nameof(UserRoles.Admin)},{nameof(UserRoles.SuperAdmin)}")]
        [ProducesResponseType(typeof(Result<BookResponse>), StatusCodes.Status200OK)]
        public async Task<IActionResult> DeleteBook([FromForm] DeleteBookRequestCommand request, CancellationToken cancellationToken)
        {
            var result = await _mediator.SendAsync(request, cancellationToken);
            return HandleResult(result);
        }


        [HttpPut("status")]
        [Authorize(Roles = $"{nameof(UserRoles.Admin)},{nameof(UserRoles.SuperAdmin)}")]
        [ProducesResponseType(typeof(Result<BookResponse>), StatusCodes.Status200OK)]
        public async Task<IActionResult> UpdateStatus([FromForm] UpdateStatusRequestCommand request, CancellationToken cancellationToken)
        {
            var result = await _mediator.SendAsync(request, cancellationToken);
            return HandleResult(result);
        }

        [HttpGet("books")]
        [ProducesResponseType(typeof(Result<IEnumerable<BookSummaryResponse>>), StatusCodes.Status200OK)]
        public async Task<IActionResult> BooksByCategoryId([FromQuery] BooksRequestQuery request, CancellationToken cancellationToken)
        {
            var result = await _mediator.SendAsync(request, cancellationToken);
            return HandleResult(result);
        }


        [HttpGet("id")]
        [ProducesResponseType(typeof(Result<BookResponse>), StatusCodes.Status200OK)]
        public async Task<IActionResult> BookById([FromQuery] BookByIdRequestQuery request, CancellationToken cancellationToken)
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




        [HttpPost("review")]
        [Authorize]
        [ProducesResponseType(typeof(Result), StatusCodes.Status200OK)]
        public async Task<IActionResult> AddReview([FromBody] CreateReviewRequestCommand request, CancellationToken cancellationToken)
        {
            var userId = User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value;
            request.UserId = Guid.Parse(userId!);

            var result = await _mediator.SendAsync(request, cancellationToken);
            return HandleResult(result);
        }
    }
}