using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Permissions;
using System.Text.Json.Serialization;
using System.Threading.Tasks;
using Libres.API.Shared.Application.CustomError;
using Libres.API.Shared.Application.Mediator;
using Libres.API.Shared.Domain.Enums;
using Microsoft.AspNetCore.Mvc.ModelBinding;

namespace Libres.API.Features.Orders.Application.Commands.Approve
{
    public record ApproveOrderCommand(Guid OrderId) : ICustomRequest<Result>
    {

    }

}