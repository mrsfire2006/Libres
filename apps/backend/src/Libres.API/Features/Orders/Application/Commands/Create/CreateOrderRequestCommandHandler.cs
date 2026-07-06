using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Libres.API.Data.Persistence;
using Libres.API.Features.Orders.Application.Common;
using Libres.API.Features.Orders.Domain;
using Libres.API.Shared.Application.CustomError;
using Libres.API.Shared.Application.Mediator;
using Microsoft.EntityFrameworkCore;

namespace Libres.API.Features.Orders.Application.Commands.Create
{
    public class CreateOrderRequestCommandHandler : ICustomRequestHandler<CreateOrderRequestCommand, Result<OrderResponse>>
    {

        private readonly AppDbContext _context;
        public CreateOrderRequestCommandHandler(AppDbContext context)
        {
            _context = context;
        }
        public async Task<Result<OrderResponse>> HandleAsync(CreateOrderRequestCommand request, CancellationToken cancellationToken)
        {
            var book = await _context.Books.FirstOrDefaultAsync(x => x.Id == request.BookId);
            if (book == null)
            {
                return new ResultBuilder<OrderResponse>().WithFailure("Book not found").Build();
            }


            var orderResult = Order.Create(request.UserId, request.BookId, book.Price);


            if (orderResult.IsFailure)
            {
                return new ResultBuilder<OrderResponse>().WithFailure(orderResult.ErrorMessage).Build();
            }
            var order = orderResult.Value!;
            _context.Orders.Add(order);
            await _context.SaveChangesAsync(cancellationToken);


            var response = new OrderResponse(order.Id, order.Status);
            return Result<OrderResponse>.Success(response);
        }
    }
}