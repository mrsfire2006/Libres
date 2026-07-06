using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Libres.API.Features.Books.Domain.Entities;

namespace Libres.API.Features.Books.Application.Common
{
    public record BookResponse(
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
         string? FileUrl,
         IEnumerable<ReviewResponse>? Reviews,
         double AverageRate,
         int PageCount,
         long FileSizeInBytes,
         bool HasUserReviewed = false

    );

}