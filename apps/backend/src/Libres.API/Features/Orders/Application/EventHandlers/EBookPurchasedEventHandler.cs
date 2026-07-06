using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Libres.API.Data.Persistence;
using Libres.API.Features.Orders.Domain.Events;
using Libres.API.Features.UserLibrary.Domain;
using Libres.API.Shared.Application.Mediator;

namespace Libres.API.Features.Orders.Application.EventHandlers
{
    public class EBookPurchasedEventHandler : ICustomNotificationHandler<EBookPurchasedEvent>
    {

        private readonly AppDbContext _context;
        public EBookPurchasedEventHandler(AppDbContext context)
        {
            _context = context;
        }
        public async Task HandleAsync(EBookPurchasedEvent notification, CancellationToken cancellationToken = default)
        {
            var libraryResult = Library.Create(notification.UserId, notification.BookId);


            _context.Libraries.Add(libraryResult.Value!);

            await _context.Libraries.AddAsync(libraryResult.Value!, cancellationToken);
        }
    }
}