using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Libres.API.Features.Categories.Application.Common
{
    public record CategoryResponse(Guid CategoryId, string Name, string? Description = null);

}