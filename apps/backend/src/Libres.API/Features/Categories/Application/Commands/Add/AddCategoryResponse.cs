using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Libres.API.Features.Categories.Application.Commands.Add
{
    public record AddCategoryResponse(Guid CategoryId, string Name, string? Description = null);


}