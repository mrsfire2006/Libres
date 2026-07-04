using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Libres.API.Features.Books.Application.Common
{
    public record ReviewResponse(Guid ReviewId, string Comment, int Rating);

}