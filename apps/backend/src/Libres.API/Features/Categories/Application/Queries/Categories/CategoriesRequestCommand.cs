using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Libres.API.Features.Categories.Application.Common;
using Libres.API.Shared.Application.CustomError;
using Libres.API.Shared.Application.Mediator;

namespace Libres.API.Features.Categories.Application.Queries.Categories
{
    public record CategoriesRequestCommand : ICustomRequest<Result<IEnumerable<CategoryResponse>>>;

}