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
    public class CreateReviewRequestCommanHandler : ICustomRequestHandler<CreateReviewRequestCommand, Result>
    {

        private readonly AppDbContext _context;
        public CreateReviewRequestCommanHandler(AppDbContext context)
        {
            _context = context;
        }
        public async Task<Result> HandleAsync(CreateReviewRequestCommand request, CancellationToken cancellationToken)
        {

            var reviewResult = Review.Create(request.UserId, request.BookId, request.comment, request.rating);

            if (reviewResult.IsFailure)
            {
                return new ResultBuilder().WithFailure(reviewResult.ErrorMessage).Build();

            }
            var review = reviewResult.Value!;
            var book = await _context.Books.FirstOrDefaultAsync(x => x.Id == request.BookId);


            if (book == null)
            {
                return new ResultBuilder<ReviewResponse>().WithFailure("Book Not Found").Build();


            }

            book.AddReview(review);
            try
            {

                await _context.SaveChangesAsync(cancellationToken);
            }
            catch
            {
                return new ResultBuilder().WithFailure("User is already reviewed").Build();
            }

            return new ResultBuilder().WithSuccess().Build();


        }
    }
}