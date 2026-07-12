using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Libres.API.Features.Books.Application.Common;
using Libres.API.Shared.Application.CustomError;
using Libres.API.Shared.Application.Mediator;

namespace Libres.API.Features.Books.Application.Commands.Edit
{
    public record EditBookRequestCommand(Guid BookId, string Title, string? Description, decimal Price, Guid? CategoryId) : ICustomRequest<Result>;
}