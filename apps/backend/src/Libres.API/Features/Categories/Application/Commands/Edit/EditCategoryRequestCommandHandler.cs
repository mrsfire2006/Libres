using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Libres.API.Data.Persistence;
using Libres.API.Shared.Application.CustomError;
using Libres.API.Shared.Application.Mediator;
using Microsoft.EntityFrameworkCore;

namespace Libres.API.Features.Categories.Application.Commands.Edit
{
    public class EditCategoryRequestCommandHandler : ICustomRequestHandler<EditCategoryRequestCommand, Result<string>>
    {

        private readonly AppDbContext _context;
        public EditCategoryRequestCommandHandler(AppDbContext context)
        {
            _context = context;
        }
        public async Task<Result<string>> HandleAsync(EditCategoryRequestCommand request, CancellationToken cancellationToken)
        {
            if (!Guid.TryParse(request.categoryId, out Guid CategoryId))
            {
                return Result<string>.Failure(Error.Validation("Id is not valid"));
            }

            var category = await _context.Categories.FirstOrDefaultAsync(x => x.Id == CategoryId, cancellationToken);

            if (category == null)
            {
                return Result<string>.Failure(Error.NotFound("Category not found"));
            }

            var result = category.ChangeName(request.newName);

            if (result.IsFailure)
            {
                return result;
            }

            category.ChangeDescription(request.newDescription);


            await _context.SaveChangesAsync(cancellationToken);
            return Result<string>.Success("Category Changed");
        }
    }
}