using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Libres.API.Features.Reviews.Application.Queries.AllReviews
{


    public record GetReviewResponse(Guid ReviewId, string Comment, int Rating, string Username, string? Image, DateTime CreatedAt, Guid? UserId);

}