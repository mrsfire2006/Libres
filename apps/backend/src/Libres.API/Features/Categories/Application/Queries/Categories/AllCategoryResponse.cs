using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Libres.API.Features.Categories.Application.Queries.Categories
{
    public record AllCategoryResponse(Guid CategoryId, string Name, string? Description = null);

}