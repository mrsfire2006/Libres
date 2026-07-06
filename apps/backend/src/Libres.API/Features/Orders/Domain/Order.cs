using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Libres.API.Features.Orders.Domain.Events;
using Libres.API.Shared.Application.CustomError;
using Libres.API.Shared.Domain;
using Libres.API.Shared.Domain.Enums;

namespace Libres.API.Features.Orders.Domain
{
    public class Order : AggregateRoot
    {
        public Guid BookId { get; private set; }
        public Guid UserId { get; private set; }
        public decimal Price { get; private set; }
        public DateTime OrderDate { get; private set; }

        public OrderStatus Status { get; private set; }

        public Order() : base(Guid.Empty)
        {
        }

        public Order(Guid id, Guid userId, Guid bookId, decimal price) : base(id)
        {

            UserId = userId;
            BookId = bookId;
            Price = price;
            Status = OrderStatus.Pending;
            OrderDate = DateTime.UtcNow;
        }

        public static Result<Order> Create(Guid userId, Guid bookId, decimal price)
        {

            return Result<Order>.Success(new Order(Guid.NewGuid(), userId, bookId, price));
        }

        public Result ApprovePayment()
        {
            if (Status != OrderStatus.Pending)
                return Result.Failure("لا يمكن قبول طلب في حالته الحالية.");

            Status = OrderStatus.Completed;

            this.AddEvent(new EBookPurchasedEvent(UserId, BookId));
            return Result.Success();
        }
    }
}