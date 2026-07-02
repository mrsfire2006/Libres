
using Libres.API.Data.Persistence;
using Libres.API.Features.Users.Domain.Events;
using Libres.API.Shared.Application.Mediator;
using Libres.API.Features.Wallet.Domain;


namespace Libres.API.Features.Users.Application.Events
{
    public class UserCreatedEventHandler : ICustomNotificationHandler<UserCreatedEvent>
    {

        private readonly AppDbContext _context;
        public UserCreatedEventHandler(AppDbContext context)
        {
            _context = context;
        }
        public Task HandleAsync(UserCreatedEvent notification, CancellationToken cancellationToken = default)
        {
            if (notification.UserId == Guid.Empty)
                throw new InvalidOperationException("UserId جاي فاضي! المشكلة قبل كده في مكان تاني.");

            var walletResult = Wallet.Domain.Wallet.Create(notification.UserId);

            _context.Wallets.Add(walletResult.Value!);
            return Task.CompletedTask;
        }
    }
}