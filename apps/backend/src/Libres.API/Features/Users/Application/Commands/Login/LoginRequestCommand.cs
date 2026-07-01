using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Libres.API.Features.Users.Application.Common;
using Libres.API.Shared.Application.CustomError;
using Libres.API.Shared.Application.Mediator;

namespace Libres.API.Features.Users.Application.Commands.Login
{
    public record LoginRequestCommand(string Email, string Password) : ICustomRequest<Result<SigninResponse>>;

}