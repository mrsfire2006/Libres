using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Libres.API.Features.Reviews.Domain.Events;
using Libres.API.Shared.Application.CustomError;
using Libres.API.Shared.Domain;

namespace Libres.API.Features.Reviews.Domain
{
    public class Review : AggregateRoot
    {
        public Guid? UserId { get; private set; }
        public Guid BookId { get; private set; } = default!;
        public string? Comment { get; private set; }
        public int Rating { get; private set; }
        public DateTime CreatedAt { get; private set; }
        protected Review() : base(Guid.Empty)
        {
        }
        private Review(Guid id, Guid userId, Guid bookId, string? comment, int rating) : base(id)
        {
            UserId = userId;
            BookId = bookId;
            Comment = comment;
            Rating = rating;
            CreatedAt = DateTime.UtcNow;
        }

        public static Result<Review> Create(Guid userId, Guid bookId, string? comment, int rating)
        {

            var review = Result<Review>.Success(new Review(Guid.NewGuid(), userId, bookId, comment, rating));

            review.Value!.AddEvent(new ReviewCreatedEvent(bookId));

            return review;
        }

        public Result<string> EditComment(string comment)
        {
            if (string.IsNullOrWhiteSpace(comment))
            {
                return Result<string>.Failure("Comment is required");

            }


            Comment = comment;
            return Result<string>.Success("Edited comment");

        }
        public Result<string> EditRating(int rating)
        {
            if (rating <= 0)
            {
                return Result<string>.Failure("Rating is required");

            }

            Rating = rating;

            return Result<string>.Success("Edited rate");

        }
    }
}