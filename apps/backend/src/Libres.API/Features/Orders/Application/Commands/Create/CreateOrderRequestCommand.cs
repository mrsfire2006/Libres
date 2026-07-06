using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;
using Libres.API.Features.Orders.Application.Common;
using Libres.API.Shared.Application.CustomError;
using Libres.API.Shared.Application.Mediator;
using Libres.API.Shared.Domain.Enums;
using Microsoft.AspNetCore.Mvc.ModelBinding;

namespace Libres.API.Features.Orders.Application.Commands.Create
{
    public record CreateOrderRequestCommand(Guid BookId) : ICustomRequest<Result<OrderResponse>>
    {

        [JsonIgnore]
        [BindNever]
        public Guid UserId { get; set; }
    }
}