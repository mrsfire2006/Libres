using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Libres.API.Data.Persistence;
using Libres.API.Features.Reviews.Domain;
using Libres.API.Shared.Application.CustomError;
using Libres.API.Shared.Application.Mediator;
using Microsoft.EntityFrameworkCore;

namespace Libres.API.Features.Reviews.Application.Commands.Create
{
    public class CreateReviewRequestCommandHandler : ICustomRequestHandler<CreateReviewRequestCommand, Result>
    {
        private readonly AppDbContext _context;
        private readonly CustomMediator _eventDispatcher;
        public CreateReviewRequestCommandHandler(AppDbContext context, CustomMediator mediator)
        {
            _context = context;
            _eventDispatcher = mediator;
        }
        public async Task<Result> HandleAsync(CreateReviewRequestCommand request, CancellationToken cancellationToken)
        {
            var reviewResult = Review.Create(request.UserId, request.BookId, request.comment, request.rating);

            if (reviewResult.IsFailure || reviewResult.Value == default)
            {
                return new ResultBuilder().WithFailure(reviewResult.ErrorMessage).Build();

            }
            var review = reviewResult.Value;
            _context.Reviews.Add(review);

            using var transaction = await _context.Database.BeginTransactionAsync(cancellationToken);

            try
            {

                await _context.SaveChangesAsync(cancellationToken);
                while (review.DomainEvents.Any())
                {
                    var domainEvents = review.DomainEvents.ToList();
                    review.ClearDomainEvents();

                    foreach (var domainEvent in domainEvents)
                    {
                        await _eventDispatcher.PublishAsync(domainEvent, cancellationToken);
                    }
                }
                await transaction.CommitAsync(cancellationToken);
            }
            catch (DbUpdateException)
            {
                await transaction.RollbackAsync(cancellationToken);
                return new ResultBuilder<CreateReviewResponse>().WithFailure("User is already reviewed").Build();
            }
            catch (Exception ex)
            {
                await transaction.RollbackAsync(cancellationToken);
                return new ResultBuilder<CreateReviewResponse>().WithFailure($"An error occurred: {ex.Message}").Build();
            }




            return new ResultBuilder<CreateReviewResponse>().WithSuccess().Build();
        }
    }
}