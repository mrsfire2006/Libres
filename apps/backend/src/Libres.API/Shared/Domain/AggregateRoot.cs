using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Libres.API.Shared.Application.Mediator;

namespace Libres.API.Shared.Domain
{
    public abstract class AggregateRoot(Guid id) : Entity(id)
    {


        private readonly List<ICustomNotification> _domainEvents = new List<ICustomNotification>();

        public IReadOnlyCollection<ICustomNotification> DomainEvents => _domainEvents.AsReadOnly();
        public void ClearDomainEvents() => _domainEvents.Clear();
        public void AddEvent(ICustomNotification ev)
        {
            this._domainEvents.Add(ev);
        }
    }
}