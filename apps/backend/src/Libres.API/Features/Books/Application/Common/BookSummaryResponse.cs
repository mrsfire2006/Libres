using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Libres.API.Shared.Domain.Enums;

namespace Libres.API.Features.Books.Application.Common
{
    public record BookSummaryResponse(Guid Id,
    string Title,
    string Author,
    string? CategoryName,
    decimal Price,
    int Order,
    string BookStatus,
    DateTime PublishedAt, 
    string? CoverImageUrl);


}