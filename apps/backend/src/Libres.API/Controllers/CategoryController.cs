using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Libres.API.Common;
using Libres.API.Features.Categories.Application.Commands.Add;
using Libres.API.Features.Categories.Application.Commands.Edit;
using Libres.API.Features.Categories.Application.Queries.Categories;
using Libres.API.Shared.Application.CustomError;
using Libres.API.Shared.Application.Mediator;
using Libres.API.Shared.Domain.Enums;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Libres.API.Controllers
{
    [Route("category")]
    public class CategoryController : ApiControllerBase
    {
        private readonly CustomMediator _mediator;
        public CategoryController(CustomMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet("categories")]
        [ProducesResponseType(typeof(Result<IEnumerable<AllCategoryResponse>>), StatusCodes.Status200OK)]
        public async Task<IActionResult> GetAllCategories(CancellationToken cancellationToken = default)
        {
            var request = new CategoriesRequestQuery();
            var result = await _mediator.SendAsync<CategoriesRequestQuery, Result<IEnumerable<AllCategoryResponse>>>(request,null, cancellationToken);

            return HandleResult(result);
        }

        [HttpPut("edit")]
        [Authorize(Roles = $"{nameof(UserRoles.Admin)},{nameof(UserRoles.SuperAdmin)}")]
        [ProducesResponseType(typeof(Result), StatusCodes.Status200OK)]
        public async Task<IActionResult> EditCategory([FromBody] EditCategoryRequestCommand request, CancellationToken cancellationToken = default)
        {
            var result = await _mediator.SendAsync<EditCategoryRequestCommand, Result>(request,null, cancellationToken);

            return HandleResult(result);
        }
        [HttpPost("add")]
        [Authorize(Roles = $"{nameof(UserRoles.Admin)},{nameof(UserRoles.SuperAdmin)}")]
        [ProducesResponseType(typeof(Result<AddCategoryResponse>), StatusCodes.Status200OK)]
        public async Task<IActionResult> AddCategory([FromBody] AddCategoryRequestCommand request, CancellationToken cancellationToken = default)
        {
            var result = await _mediator.SendAsync<AddCategoryRequestCommand, Result<AddCategoryResponse>>(request,null, cancellationToken);

            return HandleResult(result);
        }
    }
}