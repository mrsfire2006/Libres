using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Libres.API.Data.Persistence;
using Libres.API.Shared.Application.CustomError;
using Libres.API.Shared.Application.Mediator;
using Libres.API.Shared.Domain.Enums;
using Microsoft.EntityFrameworkCore;

namespace Libres.API.Features.Books.Application.Commands.UpdateStatus
{
    public class UpdateStatusRequestCommandHandler : ICustomRequestHandler<UpdateStatusRequestCommand, Result<string>>
    {

        private readonly AppDbContext _context;
        public UpdateStatusRequestCommandHandler(AppDbContext context)
        {
            _context = context;
        }
        public async Task<Result<string>> HandleAsync(UpdateStatusRequestCommand request, CancellationToken cancellationToken)
        {
            var book = await _context.Books.FirstOrDefaultAsync(x => x.Id == request.BookId);

            if (book == null)
            {
                return new ResultBuilder<string>().WithFailure("Book Not Found").Build();

            }

            if (book.BookStatus == request.BookStatus)
            {
                return new ResultBuilder<string>().WithFailure($"Book Is Already {request.BookStatus.ToString()}").Build();

            }

            book.UpdateStatus(request.BookStatus);

            await _context.SaveChangesAsync(cancellationToken);

            return new ResultBuilder<string>().WithFailure("Book Updated").Build();

        }
    }
}