using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Libres.API.Shared.Application.Mediator;

namespace Libres.API.Features.Reviews.Domain.Events
{
    public class ReviewCreatedEvent : ICustomNotification
    {
        public Guid BookId { get; }
        public ReviewCreatedEvent(Guid bookId)
        {
            BookId = bookId;
        }
    }
}