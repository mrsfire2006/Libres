using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Libres.API.Features.Books.Application.Common;

namespace Libres.API.Features.Books.Application.Commands.Create
{

    public record CreateBookResponse(
     Guid Id,
     string Title,
     string Author,
     Guid UserId,
     Guid? CategoryId,
     string? CategoryName,
     decimal Price,
     string BookStatus,
     int Order,
     string? Description,
     DateTime CreatedAt,
     string? CoverImageUrl,
     IEnumerable<ReviewResponse>? Reviews,
     double AverageRate,
     int PageCount,
     long FileSizeInBytes,
     bool HasUserReviewed = false

);
}