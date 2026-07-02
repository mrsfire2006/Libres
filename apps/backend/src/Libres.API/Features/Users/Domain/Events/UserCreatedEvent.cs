using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Libres.API.Shared.Application.Mediator;

namespace Libres.API.Features.Users.Domain.Events
{
    public class UserCreatedEvent : ICustomNotification
    {
        public Guid UserId { get; }
        public UserCreatedEvent(Guid userId)
        {
            UserId = userId;
        }
    }
}