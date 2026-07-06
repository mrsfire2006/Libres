using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Libres.API.Features.Books.Domain;
using Libres.API.Features.UserLibrary.Domain;
using Libres.API.Features.Users.Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Libres.API.Shared.Infrastructure.Configurations
{
    public class LibraryConfig : IEntityTypeConfiguration<Library>
    {
        public void Configure(EntityTypeBuilder<Library> builder)
        {
            builder.HasKey(x => x.Id);

            builder.HasOne<Book>()
                       .WithMany()
                       .HasForeignKey(x => x.BookId)
                       .OnDelete(DeleteBehavior.Restrict);




            builder.HasOne<User>()
                       .WithMany()
                       .HasForeignKey(x => x.UserId)
                       .OnDelete(DeleteBehavior.Restrict);
            builder.HasIndex(x => new { x.UserId, x.BookId }).IsUnique();
        }
    }
}