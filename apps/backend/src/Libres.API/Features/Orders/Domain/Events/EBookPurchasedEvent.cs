using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Libres.API.Shared.Application.Mediator;

namespace Libres.API.Features.Orders.Domain.Events
{
    public class EBookPurchasedEvent : ICustomNotification
    {
        public Guid UserId { get; }
        public Guid BookId { get; }
        public EBookPurchasedEvent(Guid userId, Guid bookId)
        {
            UserId = userId;
            BookId = bookId;
        }
    }
}