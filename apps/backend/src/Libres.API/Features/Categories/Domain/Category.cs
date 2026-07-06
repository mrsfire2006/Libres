using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Libres.API.Shared.Application.CustomError;
using Libres.API.Shared.Domain;

namespace Libres.API.Features.Categories.Domain
{
    public class Category : AggregateRoot
    {


        public string Name { get; private set; } = default!;
        public string? Description { get; private set; } = default;

        protected Category() : base(Guid.Empty)
        {
        }
        private Category(Guid id, string name, string? description = default) : base(id)
        {
            Name = name;
            Description = description;

        }

        public static Result<Category> Create(string Name, string? Description = default)
        {
            if (string.IsNullOrWhiteSpace(Name))
            {
                return Result<Category>.Failure("Category Name");

            }
            var category = new Category(Guid.NewGuid(), Name, Description);

            return Result<Category>.Success(category);
        }

        public Result<string> ChangeName(string name)
        {
            if (string.IsNullOrWhiteSpace(name))
            {
                return Result<string>.Failure("Category Name is required");
            }

            Name = name;
            return Result<string>.Success("Category Name Changed");

        }
        public void ChangeDescription(string? description)
        {

            Description = description;

        }



    }
}