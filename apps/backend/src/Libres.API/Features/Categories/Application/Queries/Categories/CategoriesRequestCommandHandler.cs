using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Libres.API.Data.Persistence;
using Libres.API.Features.Categories.Application.Common;
using Libres.API.Shared.Application.CustomError;
using Libres.API.Shared.Application.Mediator;
using Microsoft.EntityFrameworkCore;

namespace Libres.API.Features.Categories.Application.Queries.Categories
{
    public class CategoriesRequestCommandHandler : ICustomRequestHandler<CategoriesRequestCommand, Result<IEnumerable<CategoryResponse>>>
    {
        private readonly AppDbContext _context;
        public CategoriesRequestCommandHandler(AppDbContext context)
        {
            _context = context;
        }
        public async Task<Result<IEnumerable<CategoryResponse>>> HandleAsync(CategoriesRequestCommand request, CancellationToken cancellationToken)
        {
            var categories = await _context.Categories.AsNoTracking().Select(x => new CategoryResponse(x.Id, x.Name)).ToListAsync(cancellationToken);

            return Result<IEnumerable<CategoryResponse>>.Success(categories);
        }
    }
}