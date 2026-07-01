using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Libres.API.Shared.Application.CustomError;
using Libres.API.Shared.Application.Mediator;
using Libres.API.Shared.Domain.Enums;

namespace Libres.API.Features.Books.Application.Commands.UpdateStatus
{
    public record UpdateStatusRequestCommand(Guid BookId, BookStatus BookStatus) : ICustomRequest<Result<string>>;

}