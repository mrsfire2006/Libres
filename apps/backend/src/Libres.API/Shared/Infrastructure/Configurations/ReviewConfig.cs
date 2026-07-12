using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Libres.API.Features.Books.Domain;
using Libres.API.Features.Reviews.Domain;
using Libres.API.Features.Users.Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Libres.API.Shared.Infrastructure.Configurations
{
    public class ReviewConfig : IEntityTypeConfiguration<Review>
    {
        public void Configure(EntityTypeBuilder<Review> builder)
        {
            builder.HasKey(x => x.Id);
            builder.Property(x => x.Id);


            builder.HasIndex(x => new { x.UserId, x.BookId })
                       .IsUnique();
            builder.HasOne<Book>()
                       .WithMany()
                       .HasForeignKey(r => r.BookId)
                       .OnDelete(DeleteBehavior.Cascade);

            builder.HasOne<User>()
            .WithMany()
            .HasForeignKey(x => x.UserId)
            .OnDelete(DeleteBehavior.SetNull);
        }
    }
}