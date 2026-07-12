using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Libres.API.Shared.Application.CustomError;
using Libres.API.Shared.Application.Mediator;

namespace Libres.API.Features.Reviews.Application.Queries.AllReviews
{
    public record GetReviewsRequestQuery(Guid BookId, int? Take = 10, int? Skip = 1) : ICustomRequest<Result<IEnumerable<GetReviewResponse>>>;


}