using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FluentValidation;

namespace Libres.API.Features.Users.Application.Commands.Register
{
    public class RegisterRequestCommandValidator : AbstractValidator<RegisterRequestCommand>
    {
        public RegisterRequestCommandValidator()
        {
            RuleFor(x => x.Username)
               .NotEmpty().WithMessage("Username is required.")
               .MinimumLength(3).WithMessage("Username must be at least 3 characters long.");
            
            RuleFor(x => x.Email)
               .NotEmpty().WithMessage("Email address is required.");

            RuleFor(x => x.password)
               .NotEmpty().WithMessage("Password is required.")
               .MinimumLength(3).WithMessage("Password must be at least 3 characters long.");            
            
            RuleFor(x => x.PhoneNumber)
               .Matches(@"^\+?[1-9]\d{1,14}$")
               .WithMessage("Invalid phone number format. (e.g., +1234567890)");
 
            RuleFor(x => x.roles)
               .IsInEnum().WithMessage("The specified user role is invalid.");
        }
    }
}