using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Libres.API.Shared.Application.CustomError;
using Libres.API.Shared.Domain.Enums;
using Microsoft.AspNetCore.Identity;

namespace Libres.API.Features.Users.Domain
{
    public class User : IdentityUser<Guid>
    {
        public string? Image { get; private set; }
        public bool Active { get; private set; } = true;
        public DateTime CreatedAt { get; private set; } = DateTime.UtcNow;
        public UserRoles Roles { get; private set; }

        public User() : base()
        {
        }

        private User(string username, string email, string? image, UserRoles roles)
        {
            UserName = username;
            Email = email;
            Image = image;
            Active = true;
            Roles = roles;
        }

        public static Result<User> Create(string username, string email, string password, string? image, UserRoles roles = UserRoles.Reader)
        {
            if (string.IsNullOrWhiteSpace(username))
            {
                return Result<User>.Failure(Error.Validation("Username is required."));
            }

            if (string.IsNullOrWhiteSpace(email))
            {
                return Result<User>.Failure(Error.Validation("Email is required."));
            }
            if (string.IsNullOrWhiteSpace(password))
            {
                return Result<User>.Failure(Error.Validation("Password is required."));
            }

            var user = new User(username, email, image, roles);
            user.NormalizedUserName = username.ToUpperInvariant();
            user.NormalizedEmail = email.ToUpperInvariant();

            // هنا تقدر تضيف الـ Domain Event بتاعك عادي جداً
            // user.AddEvent(new OnUserRegistered(user)); 

            return Result<User>.Success(user);
        }


        public void Deactivate() => this.Active = false;
        public void Activate() => this.Active = true;
    }
}