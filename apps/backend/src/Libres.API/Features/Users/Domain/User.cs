using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Libres.API.Features.Users.Domain.Events;
using Libres.API.Shared.Application.CustomError;
using Libres.API.Shared.Application.Mediator;
using Libres.API.Shared.Domain.Enums;
using Microsoft.AspNetCore.Identity;
using Microsoft.CodeAnalysis.CSharp.Syntax;

namespace Libres.API.Features.Users.Domain
{
    public class User : IdentityUser<Guid>
    {
        public string? Image { get; private set; }
        public bool Active { get; private set; } = true;
        public DateTime CreatedAt { get; private set; } = DateTime.UtcNow;
        public UserRoles Roles { get; private set; }

        private readonly List<ICustomNotification> _domainEvents = new List<ICustomNotification>();

        public IReadOnlyCollection<ICustomNotification> DomainEvents => _domainEvents.AsReadOnly();
        public void ClearDomainEvents() => _domainEvents.Clear();
        public void AddEvent(ICustomNotification ev)
        {
            this._domainEvents.Add(ev);
        }

        public User() : base()
        {
        }

        private User(Guid userId, string username, string email, string password, string? image, UserRoles roles)
        {
            Id = userId;
            UserName = username;
            Email = email;
            Image = image;
            Active = true;
            Roles = roles;
            if (this.Roles == UserRoles.SuperAdmin)
            {
                PasswordHash = password;
            }
        }

        public static Result<User> Create(string username, string email, string password, string? image, UserRoles roles = UserRoles.Reader)
        {
            if (string.IsNullOrWhiteSpace(username))
            {
                return Result<User>.Failure("Username is required.");
            }

            if (string.IsNullOrWhiteSpace(email))
            {
                return Result<User>.Failure("Email is required.");
            }
            if (string.IsNullOrWhiteSpace(password))
            {
                return Result<User>.Failure("Password is required.");
            }



            var user = new User(Guid.NewGuid(), username, email, password, image, roles);
            user.NormalizedUserName = username.ToUpperInvariant();
            user.NormalizedEmail = email.ToUpperInvariant();

            user.AddEvent(new UserCreatedEvent(user.Id));

            return Result<User>.Success(user);
        }


        public void Deactivate() => this.Active = false;
        public void Activate() => this.Active = true;


        public Result<User> UpdateUsername(string newUsername)
        {
            if (string.IsNullOrWhiteSpace(newUsername))
            {
                return Result<User>.Failure("Username cannot be empty.");
            }

            if (UserName == newUsername)
            {
                return Result<User>.Success(this);
            }

            UserName = newUsername;
            NormalizedUserName = newUsername.ToUpperInvariant();



            return Result<User>.Success(this);
        }

        public void UpdateImage(string? image)
        {
            this.Image = image;
        }

        public void SetStatic(string superAdminId, string securityStamp, string concurrencyStamp)
        {
            this.Id = Guid.Parse(superAdminId);
            this.SecurityStamp = securityStamp;
            this.ConcurrencyStamp = concurrencyStamp;

            this.CreatedAt = new DateTime(2026, 1, 1, 0, 0, 0, DateTimeKind.Utc);
        }

    }
}