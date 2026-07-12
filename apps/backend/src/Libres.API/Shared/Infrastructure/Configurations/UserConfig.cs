using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Libres.API.Features.Users;
using Libres.API.Features.Users.Domain;
using Libres.API.Shared.Domain.Enums;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Libres.API.Shared.Infrastructure.Configurations
{
    public class UserConfig : IEntityTypeConfiguration<User>
    {
        public void Configure(EntityTypeBuilder<User> builder)
        {

            builder.ToTable("Users");
            builder.Property(x => x.Id).ValueGeneratedNever();
            builder.Ignore(u => u.TwoFactorEnabled);
            builder.Ignore(u => u.EmailConfirmed);
            builder.Ignore(u => u.AccessFailedCount);
            builder.Ignore(u => u.LockoutEnabled);
            builder.Ignore(u => u.LockoutEnd);
            builder.Ignore(u => u.PhoneNumberConfirmed);

            var superAdminResult = User.Create("mrs", "mrs@gmail.com", "AQAAAAIAAYagAAAAEDPc+KQMZJSaHGuzbY3AcPieWpoeEb2fur0PLIB+R7qVVx2JmhYy0D3eSyar5l6/2A==", null, UserRoles.SuperAdmin);

            var superAdmin = superAdminResult.Value!;

            superAdmin.SetStatic(
                superAdminId: "c74ddd14-6340-4840-95c2-db12554843e6",
                securityStamp: "STATIC_SECURITY_STAMP_FOR_ADMIN",
                concurrencyStamp: "STATIC_CONCURRENCY_STAMP_FOR_ADMIN"
            );


            builder.HasData(superAdmin);
        }
    }
}