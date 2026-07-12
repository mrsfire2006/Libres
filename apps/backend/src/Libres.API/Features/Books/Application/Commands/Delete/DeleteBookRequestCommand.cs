using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Libres.API.Shared.Application.CustomError;
using Libres.API.Shared.Application.Mediator;

namespace Libres.API.Features.Books.Application.Commands.Delete
{
    public record DeleteBookRequestCommand(Guid BookId) : ICustomRequest<Result>;

}