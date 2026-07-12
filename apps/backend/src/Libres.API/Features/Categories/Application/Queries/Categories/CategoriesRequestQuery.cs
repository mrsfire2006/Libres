using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Libres.API.Shared.Application.CustomError;
using Libres.API.Shared.Application.Mediator;

namespace Libres.API.Features.Categories.Application.Queries.Categories
{
    public record CategoriesRequestQuery : ICustomRequest<Result<IEnumerable<AllCategoryResponse>>>;

}