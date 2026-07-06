using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Libres.API.Data.Persistence;
using Libres.API.Features.Users.Application.Common;
using Libres.API.Features.Users.Domain;
using Libres.API.Shared.Application.CustomError;
using Libres.API.Shared.Application.Mediator;
using Libres.API.Shared.Domain.Enums;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace Libres.API.Features.Users.Application.Commands.Register
{
    public class RegisterRequestCommandHandler : ICustomRequestHandler<RegisterRequestCommand, Result<SigninResponse>>
    {
        private readonly AppDbContext _context;
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;
        private readonly CustomMediator _eventDispatcher;
        public RegisterRequestCommandHandler(AppDbContext context, UserManager<User> userManager, SignInManager<User> signInManager, CustomMediator eventDispatcher)
        {
            _context = context;
            _userManager = userManager;
            _signInManager = signInManager;
            _eventDispatcher = eventDispatcher;
        }
        public async Task<Result<SigninResponse>> HandleAsync(RegisterRequestCommand request, CancellationToken cancellationToken)
        {
            var userExists = await _context.Users
                    .AnyAsync(u => u.NormalizedUserName == request.Username.ToUpperInvariant()
                                || u.NormalizedEmail == request.Email.ToUpperInvariant(), cancellationToken);



            if (userExists)
            {
                return new ResultBuilder<SigninResponse>().WithFailure("Username or Email is already used").Build();
            }

            var role = request.roles;
            if (!Enum.IsDefined<UserRoles>(role))
            {
                return new ResultBuilder<SigninResponse>().WithFailure("Role is not exist").Build();


            }
            if (role == UserRoles.SuperAdmin)
            {
                return new ResultBuilder<SigninResponse>().WithFailure("Cannot create super admin", 403).Build();
            }

            if (request.CurrentUserRole != null && role == UserRoles.Admin && request.CurrentUserRole != UserRoles.SuperAdmin)
            {
                return new ResultBuilder<SigninResponse>().WithFailure("Forbidden User", 403).Build();

            }




            var userResult = User.Create(request.Username, request.Email, request.password, null, role);
            if (userResult.IsFailure)
            {
                return new ResultBuilder<SigninResponse>().WithFailure(userResult.ErrorMessage, userResult.StatusCode).Build();
            }
            var user = userResult.Value!;

            using var transaction = await _context.Database.BeginTransactionAsync(cancellationToken);
            try
            {
                var createResult = await _userManager.CreateAsync(user, request.password);


                if (!createResult.Succeeded)
                {
                    var firstError = createResult.Errors.First().Description;
                    return new ResultBuilder<SigninResponse>().WithFailure(firstError).Build();

                }
                if (role != UserRoles.Reader)
                {
                    user.ClearDomainEvents();
                }

                while (user.DomainEvents.Any())
                {
                    var domainEvents = user.DomainEvents.ToList();
                    user.ClearDomainEvents();

                    foreach (var domainEvent in domainEvents)
                    {
                        await _eventDispatcher.PublishAsync(domainEvent, cancellationToken);
                    }
                }

                await _context.SaveChangesAsync(cancellationToken);
                await transaction.CommitAsync(cancellationToken);


                await _signInManager.SignInAsync(user, true);


                return new ResultBuilder<SigninResponse>().WithSuccess(new SigninResponse(user.Id)).Build();
            }
            catch (Exception)
            {
                await transaction.RollbackAsync(cancellationToken);
                throw;
            }



        }

    }
}