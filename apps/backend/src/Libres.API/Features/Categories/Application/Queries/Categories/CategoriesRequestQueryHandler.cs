using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Libres.API.Data.Persistence;
using Libres.API.Shared.Application.CustomError;
using Libres.API.Shared.Application.Mediator;
using Microsoft.EntityFrameworkCore;

namespace Libres.API.Features.Categories.Application.Queries.Categories
{
    public class CategoriesRequestQueryHandler : ICustomRequestHandler<CategoriesRequestQuery, Result<IEnumerable<AllCategoryResponse>>>
    {
        private readonly AppDbContext _context;
        public CategoriesRequestQueryHandler(AppDbContext context)
        {
            _context = context;
        }
        public async Task<Result<IEnumerable<AllCategoryResponse>>> HandleAsync(CategoriesRequestQuery request, CancellationToken cancellationToken)
        {
            var categories = await _context.Categories.AsNoTracking().Select(x => new AllCategoryResponse(x.Id, x.Name)).ToListAsync(cancellationToken);

            return Result<IEnumerable<AllCategoryResponse>>.Success(categories);
        }
    }
}