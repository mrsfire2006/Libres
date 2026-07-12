
using Libres.API.Common;
using Libres.API.Features.Books.Application.Commands.Create;
using Libres.API.Features.Books.Application.Commands.Delete;
using Libres.API.Features.Books.Application.Commands.Edit;
using Libres.API.Features.Books.Application.Commands.UpdateStatus;
using Libres.API.Features.Books.Application.Common;
using Libres.API.Features.Books.Application.Queries.AuthorBook;
using Libres.API.Features.Books.Application.Queries.AuthorBooks;
using Libres.API.Features.Books.Application.Queries.Book;
using Libres.API.Features.Books.Application.Queries.BookBio;
using Libres.API.Features.Books.Application.Queries.Books;
using Libres.API.Features.Books.Application.Queries.File;
using Libres.API.Features.Books.Application.Queries.Preview;
using Libres.API.Features.Books.Domain;
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
        [ProducesResponseType(typeof(Result<CreateBookResponse>), StatusCodes.Status200OK)]
        public async Task<IActionResult> CreateBook([FromForm] CreateBookRequest request, CancellationToken cancellationToken)
        {
            if (EnsureAuthenticatedUser(out var userId) is IActionResult error)
            {
                return error;
            }

            request.UserId = userId;
            var result = await _mediator.SendAsync<CreateBookRequest, Result<CreateBookResponse>>(request, null, cancellationToken);
            return HandleResult(result);
        }
        [HttpPost("edit")]
        [Authorize(Roles = nameof(UserRoles.Author))]
        [ProducesResponseType(typeof(Result), StatusCodes.Status200OK)]
        public async Task<IActionResult> EditBook([FromForm] EditBookRequestCommand request, CancellationToken cancellationToken)
        {
            var result = await _mediator.SendAsync<EditBookRequestCommand, Result>(request, null, cancellationToken);
            return HandleResult(result);
        }


        [HttpPost("delete")]
        [Authorize(Roles = $"{nameof(UserRoles.Admin)},{nameof(UserRoles.SuperAdmin)}")]
        [ProducesResponseType(typeof(Result), StatusCodes.Status200OK)]
        public async Task<IActionResult> DeleteBook([FromForm] DeleteBookRequestCommand request, CancellationToken cancellationToken)
        {
            var result = await _mediator.SendAsync<DeleteBookRequestCommand, Result>(request, null, cancellationToken);
            return HandleResult(result);
        }


        [HttpPut("status")]
        [Authorize(Roles = $"{nameof(UserRoles.Admin)},{nameof(UserRoles.SuperAdmin)}")]
        [ProducesResponseType(typeof(Result), StatusCodes.Status200OK)]
        public async Task<IActionResult> UpdateStatus([FromForm] UpdateStatusRequestCommand request, CancellationToken cancellationToken)
        {
            var result = await _mediator.SendAsync<UpdateStatusRequestCommand, Result>(request, null, cancellationToken);
            return HandleResult(result);
        }

        [HttpGet("books")]
        [ProducesResponseType(typeof(Result<IEnumerable<BookSummaryResponse>>), StatusCodes.Status200OK)]
        public async Task<IActionResult> BooksByCategoryId([FromQuery] BooksRequestQuery request, CancellationToken cancellationToken)
        {
            var result = await _mediator.SendAsync<BooksRequestQuery, Result<IEnumerable<BookSummaryResponse>>>(request, null, cancellationToken);
            return HandleResult(result);
        }
        [HttpGet("authorbooks")]
        [Authorize]
        [ProducesResponseType(typeof(Result<IEnumerable<AuthorBookResponse>>), StatusCodes.Status200OK)]
        public async Task<IActionResult> AuthorBooks(CancellationToken cancellationToken)
        {
            if (EnsureAuthenticatedUser(out var userId) is IActionResult error)
            {
                return error;
            }

            var request = new AuthorBooksRequestQuery(userId);
            var result = await _mediator.SendAsync<AuthorBooksRequestQuery, Result<IEnumerable<AuthorBookResponse>>>(request, null, cancellationToken);
            return HandleResult(result);
        }


        [HttpGet("id")]
        [ProducesResponseType(typeof(Result<GetBookResponse>), StatusCodes.Status200OK)]
        public async Task<IActionResult> BookById([FromQuery] BookByIdRequestQuery request, CancellationToken cancellationToken)
        {
            if (TryGetCurrentUserId(out var userId))
            {
                request.UserId = userId;
            }

            var result = await _mediator.SendAsync<BookByIdRequestQuery, Result<GetBookResponse>>(request, null, cancellationToken);
            return HandleResult(result);
        }





        [HttpGet("file")]
        [Authorize]
        [ProducesResponseType(typeof(FileResult), StatusCodes.Status200OK)]
        public async Task<IActionResult> GetFile([FromQuery] FileRequestQuery request, CancellationToken cancellationToken)
        {
            if (EnsureAuthenticatedUser(out var userId) is IActionResult error)
            {
                return error;
            }

            request.UserId = userId;
            var result = await _mediator.SendAsync<FileRequestQuery, Result<FileResponse>>(request, null, cancellationToken);

            if (!result.IsSuccess || result.Value == null)
            {
                return NotFound(result.ErrorMessage ?? "File not found");
            }

            return File(result.Value?.FileBytes!, "application/pdf");
        }
        [HttpGet("preview")]
        [ProducesResponseType(typeof(FileResult), StatusCodes.Status200OK)]
        public async Task<IActionResult> Preview([FromQuery] PreviewRequestQuery request, CancellationToken cancellationToken)
        {
            var result = await _mediator.SendAsync<PreviewRequestQuery, Result<byte[]>>(request, null, cancellationToken);

            if (!result.IsSuccess || result.Value == null)
            {
                return NotFound(result.ErrorMessage ?? "File not found");
            }
            return File(result.Value, "application/pdf");
        }


        [HttpGet("bookbio")]
        [Authorize(Roles = nameof(UserRoles.Author))]
        [ProducesResponseType(typeof(Result<BookBioResponse>), StatusCodes.Status200OK)]
        public async Task<IActionResult> GetAuthorBio(CancellationToken cancellationToken = default)
        {
            if (EnsureAuthenticatedUser(out var userId) is IActionResult error)
            {
                return error;
            }

            var request = new BookBioRequestQuery(userId);
            var result = await _mediator.SendAsync<BookBioRequestQuery, Result<BookBioResponse>>(request, null, cancellationToken);
            return HandleResult(result);
        }


    }
}