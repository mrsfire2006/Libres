using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Libres.API.Data.Persistence;
using Libres.API.Features.Categories.Domain;
using Libres.API.Shared.Application.CustomError;
using Libres.API.Shared.Application.Mediator;
using Microsoft.OpenApi;

namespace Libres.API.Features.Categories.Application.Commands.Add
{
    public class AddCategoryRequestCommandHandler : ICustomRequestHandler<AddCategoryRequestCommand, Result<AddCategoryResponse>>
    {

        private readonly AppDbContext _context;
        public AddCategoryRequestCommandHandler(AppDbContext context)
        {
            _context = context;
        }
        public async Task<Result<AddCategoryResponse>> HandleAsync(AddCategoryRequestCommand request, CancellationToken cancellationToken)
        {
            var categoryResult = Category.Create(request.name, request.description);

            if (categoryResult.IsFailure)
            {
                return new ResultBuilder<AddCategoryResponse>().WithFailure(categoryResult.ErrorMessage).Build();

            }

            var category = categoryResult.Value!;
            _context.Categories.Add(category);
            await _context.SaveChangesAsync(cancellationToken);

            return new ResultBuilder<AddCategoryResponse>().WithSuccess(new AddCategoryResponse(category.Id, category.Name, category.Description)).Build();

        }
    }
}