using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Libres.API.Data.Persistence;
using Libres.API.Features.Reviews.Domain.Events;
using Libres.API.Shared.Application.Mediator;
using Microsoft.EntityFrameworkCore;

namespace Libres.API.Features.Reviews.Application.EventHandlers
{
    public class ReviewCreatedEventHandler : ICustomNotificationHandler<ReviewCreatedEvent>
    {
        private readonly AppDbContext _context;
        public ReviewCreatedEventHandler(AppDbContext context)
        {
            _context = context;
        }
        public async Task HandleAsync(ReviewCreatedEvent notification, CancellationToken cancellationToken = default)
        {
            var book = await _context.Books.FirstOrDefaultAsync(x => x.Id == notification.BookId, cancellationToken);
            if (book == null) return;

            var reviewStats = await _context.Reviews
               .Where(r => r.BookId == notification.BookId)
               .GroupBy(r => r.BookId)
               .Select(g => new
               {
                   Count = g.Count(),
                   Average = g.Average(r => r.Rating)
               })
               .FirstOrDefaultAsync(cancellationToken);

            double newAverage = reviewStats?.Average ?? 0.0;
            int newCount = reviewStats?.Count ?? 0;

            var updateResult = book.UpdateAverageRate(newAverage, newCount);

            await _context.SaveChangesAsync(cancellationToken);
        }
    }
}