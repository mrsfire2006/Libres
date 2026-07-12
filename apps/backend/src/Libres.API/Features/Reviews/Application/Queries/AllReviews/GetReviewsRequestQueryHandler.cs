using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Libres.API.Data.Persistence;
using Libres.API.Shared.Application.CustomError;
using Libres.API.Shared.Application.Mediator;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi;

namespace Libres.API.Features.Reviews.Application.Queries.AllReviews
{
    public class GetReviewsRequestQueryHandler : ICustomRequestHandler<GetReviewsRequestQuery, Result<IEnumerable<GetReviewResponse>>>
    {
        private readonly AppDbContext _context;

        public GetReviewsRequestQueryHandler(AppDbContext context)
        {
            _context = context;
        }
        public async Task<Result<IEnumerable<GetReviewResponse>>> HandleAsync(GetReviewsRequestQuery request, CancellationToken cancellationToken)
        {
            if (request.BookId == Guid.Empty)
            {
                return new ResultBuilder<IEnumerable<GetReviewResponse>>().WithFailure("Book Id Is Required").Build();
            }
            try
            {
                int takeValue = request.Take ?? 10;
                int skipValue = request.Skip.HasValue ? (request.Skip.Value - 1) * takeValue : 0;

                var reviewsQuery = await (from review in _context.Reviews.AsNoTracking()

                                          join user in _context.Users.AsNoTracking() on review.UserId equals user.Id into userGroup
                                          from subUser in userGroup.DefaultIfEmpty()

                                          join book in _context.Books.AsNoTracking() on review.BookId equals book.Id

                                          where review.BookId == request.BookId

                                          orderby review.CreatedAt descending

                                          select new GetReviewResponse
                                          (
                                              review.Id,
                                              review.Comment ?? "",
                                              review.Rating,
                                              subUser != null ? subUser.UserName! : "Unknown User",
                                              subUser != null ? subUser.Image : null,
                                              review.CreatedAt,
                                              subUser != null ? subUser.Id : Guid.Empty
                                          ))
                                          .Skip(skipValue)
                                          .Take(takeValue)
                                          .ToListAsync(cancellationToken);

                return Result<IEnumerable<GetReviewResponse>>.Success(reviewsQuery);
            }
            catch (Exception ex)
            {
                return Result<IEnumerable<GetReviewResponse>>.Failure($"حدث خطأ أثناء جلب المراجعات: {ex.Message}");
            }
        }
    }
}