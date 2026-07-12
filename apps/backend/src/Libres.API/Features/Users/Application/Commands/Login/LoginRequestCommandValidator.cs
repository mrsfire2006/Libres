using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FluentValidation;

namespace Libres.API.Features.Users.Application.Commands.Login
{
    public class LoginRequestCommandValidator : AbstractValidator<LoginRequestCommand>
    {
        public LoginRequestCommandValidator()
        {
            RuleFor(x => x.Email)
            .NotEmpty().WithMessage("Email is requried.");

            RuleFor(x => x.Password)
            .MinimumLength(3).WithMessage("Password must be at least 8 characters long.")
            .NotEmpty().NotNull().WithMessage("Passwrod is requried.");

        }

    }
}