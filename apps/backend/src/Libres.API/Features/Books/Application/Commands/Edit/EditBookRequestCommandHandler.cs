using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Libres.API.Common;
using Libres.API.Data.Persistence;
using Libres.API.Features.Books.Application.Common;
using Libres.API.Features.Books.Application.Extensions;
using Libres.API.Shared.Application.CustomError;
using Libres.API.Shared.Application.Mediator;
using Libres.API.Shared.Application.Services;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;

namespace Libres.API.Features.Books.Application.Commands.Edit
{
    public class EditBookRequestCommandHandler : ICustomRequestHandler<EditBookRequestCommand, Result>
    {

        private readonly AppDbContext _context;
        private readonly FileService _fileService;
        private readonly IHostEnvironment _environment;


        public EditBookRequestCommandHandler(AppDbContext context, FileService fileService, IHostEnvironment environment)
        {
            _context = context;
            _fileService = fileService;
            _environment = environment;

        }
        public async Task<Result> HandleAsync(EditBookRequestCommand request, CancellationToken cancellationToken)
        {
            var book = await _context.Books.FirstOrDefaultAsync(x => x.Id == request.BookId);


            if (book == null)
            {
                return new ResultBuilder().WithFailure("Book Not Found").Build();

            }
            book.ChangeName(request.Title);
            book.ChangeDescription(request.Description);
            book.UpdatePrice(request.Price);
            book.ChangeCategory(request.CategoryId);

            await _context.SaveChangesAsync(cancellationToken);


            return new ResultBuilder().WithSuccess().Build();

        }
    }
}