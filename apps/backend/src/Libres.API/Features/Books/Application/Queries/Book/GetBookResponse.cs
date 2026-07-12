using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Libres.API.Features.Books.Application.Queries.Book
{

    public record GetBookResponse(
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
         double AverageRate,
        int PageCount,
        long FileSizeInBytes,
        int ReviewCount,
        bool HasUserReviewed = false
   );

}