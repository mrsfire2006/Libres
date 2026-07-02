using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Libres.API.Shared.Application.Mediator
{
    public interface ICustomNotificationHandler<in TNotification>
           where TNotification : ICustomNotification
    {
        Task HandleAsync(TNotification notification, CancellationToken cancellationToken = default);
    }
}