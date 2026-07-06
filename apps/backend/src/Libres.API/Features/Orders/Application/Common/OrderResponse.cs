using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Libres.API.Shared.Domain.Enums;

namespace Libres.API.Features.Orders.Application.Common
{
    public record OrderResponse(Guid OrderId, OrderStatus Status);
 
}