using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Libres.API.Features.Books.Application.Queries.AuthorBook
{

    public record AuthorBookResponse(
         Guid Id,
         string Title,
         string? CategoryName,
         decimal Price,
         string BookStatus,
         int Order,
         string? Description,
         DateTime CreatedAt,
         string? CoverImageUrl,
          double AverageRate
    );

}