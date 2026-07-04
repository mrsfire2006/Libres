using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Libres.API.Shared.Application.CustomError;
using Libres.API.Shared.Domain;

namespace Libres.API.Features.Books.Domain.Entities
{
    public class Review : Entity
    {
        public Guid? UserId { get; private set; }
        public Guid BookId { get; private set; } = default!;
        public string Comment { get; private set; } = default!;
        public int Rating { get; private set; }
        protected Review() : base(Guid.Empty)
        {
        }
        private Review(Guid id, Guid userId, Guid bookId, string comment, int rating = 0) : base(id)
        {
            UserId = userId;
            BookId = bookId;
            Comment = comment;
            Rating = rating;
        }

        public static Result<Review> Create(Guid userId, Guid bookId, string comment, int rating = 0)
        {
            if (string.IsNullOrWhiteSpace(comment))
            {
                return Result<Review>.Failure(Error.Validation("Comment is required"));
            }

            return Result<Review>.Success(new Review(Guid.NewGuid(), userId, bookId, comment, rating));
        }

        public Result<string> EditComment(string comment)
        {
            if (string.IsNullOrWhiteSpace(comment))
            {
                return Result<string>.Failure(Error.Validation("Comment is required"));

            }


            Comment = comment;
            return Result<string>.Success("Edited comment");

        }
        public Result<string> EditRating(int rating)
        {
            if (rating <= 0)
            {
                return Result<string>.Failure(Error.Validation("Rating is required"));

            }

            Rating = rating;

            return Result<string>.Success("Edited rate");

        }
    }
}