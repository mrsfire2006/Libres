using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Libres.API.Data.Persistence;
using Libres.API.Shared.Application.CustomError;
using Libres.API.Shared.Application.Mediator;
using Microsoft.EntityFrameworkCore;

namespace Libres.API.Features.Orders.Application.Commands.Approve
{
    public class ApproveOrderCommandHandler : ICustomRequestHandler<ApproveOrderCommand, Result>
    {
        private readonly AppDbContext _context;
        private readonly CustomMediator _eventDispatcher;
        public ApproveOrderCommandHandler(AppDbContext context, CustomMediator eventDispatcher)
        {
            _context = context;
            _eventDispatcher = eventDispatcher;
        }
        public async Task<Result> HandleAsync(ApproveOrderCommand request, CancellationToken cancellationToken)
        {
            var orderData = await (from order in _context.Orders
                                   where order.Id == request.OrderId
                                   join user in _context.Users on order.UserId equals user.Id
                                   join wallet in _context.Wallets on user.Id equals wallet.UserId
                                   join book in _context.Books on order.BookId equals book.Id // الربط الجديد مع الكتاب
                                   select new
                                   {
                                       Order = order,
                                       User = user,
                                       Wallet = wallet,
                                       Book = book
                                   })
                                   .FirstOrDefaultAsync(cancellationToken);

            if (orderData == null)
            {
                return new ResultBuilder().WithFailure("Order not found", 404).Build();
            }
            var debitResult = orderData.Wallet.Debit(orderData.Order.Price);
            if (debitResult.IsFailure)
            {
                _context.Orders.Remove(orderData.Order);
                await _context.SaveChangesAsync(cancellationToken);
                return new ResultBuilder().WithFailure(debitResult.ErrorMessage).Build();
            }
            var approveResult = orderData.Order.ApprovePayment();

            if (approveResult.IsFailure)
            {
                return new ResultBuilder().WithFailure(approveResult.ErrorMessage, approveResult.StatusCode).Build();
            }

            while (orderData.Order.DomainEvents.Any())
            {
                var domainEvents = orderData.Order.DomainEvents.ToList();
                orderData.Order.ClearDomainEvents();

                foreach (var domainEvent in domainEvents)
                {
                    await _eventDispatcher.PublishAsync(domainEvent, cancellationToken);
                }
            }
            await _context.SaveChangesAsync(cancellationToken);

            return Result.Success();
        }
    }
}