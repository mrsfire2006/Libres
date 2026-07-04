using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Libres.API.Data.Persistence;
using Libres.API.Features.Books.Application.Common;
using Libres.API.Features.Books.Domain.Entities;
using Libres.API.Shared.Application.CustomError;
using Libres.API.Shared.Application.Mediator;
using Microsoft.EntityFrameworkCore;

namespace Libres.API.Features.Books.Application.Commands.CreateReview
{
    public class CreateReviewRequestCommanHandler : ICustomRequestHandler<CreateReviewRequestCommand, Result<ReviewResponse>>
    {

        private readonly AppDbContext _context;
        public CreateReviewRequestCommanHandler(AppDbContext context)
        {
            _context = context;
        }
        public async Task<Result<ReviewResponse>> HandleAsync(CreateReviewRequestCommand request, CancellationToken cancellationToken)
        {
            var reviewResult = Review.Create(request.UserId, request.BookId, request.comment, request.rating);

            if (reviewResult.IsFailure)
            {
                return Result<ReviewResponse>.Failure(reviewResult.Error);
            }
            var review = reviewResult.Value!;
            var book = await _context.Books.FirstOrDefaultAsync(x => x.Id == request.BookId);

            if (book == null)
            {
                return Result<ReviewResponse>.Failure(Error.NotFound("Book Not Found"));

            }

            book.AddReview(review);

            await _context.SaveChangesAsync(cancellationToken);


            return Result<ReviewResponse>.Success(new ReviewResponse(review.Id, review.Comment, review.Rating));

        }
    }
}