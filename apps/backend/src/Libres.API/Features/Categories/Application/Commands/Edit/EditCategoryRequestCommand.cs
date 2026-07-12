using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Libres.API.Shared.Application.CustomError;
using Libres.API.Shared.Application.Mediator;

namespace Libres.API.Features.Categories.Application.Commands.Edit
{
    public record EditCategoryRequestCommand(string categoryId, string newName, string? newDescription) : ICustomRequest<Result>;

}