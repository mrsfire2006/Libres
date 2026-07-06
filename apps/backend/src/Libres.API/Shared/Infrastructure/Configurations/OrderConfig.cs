using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Libres.API.Features.Books.Domain;
using Libres.API.Features.Orders.Domain;
using Libres.API.Features.Users.Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Libres.API.Shared.Infrastructure.Configurations
{
    public class OrderConfig : IEntityTypeConfiguration<Order>
    {
        public void Configure(EntityTypeBuilder<Order> builder)
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
        }
    }
}