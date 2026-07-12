using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;
using FluentValidation;
using Libres.API.Features.Users.Application.Commands.Register;
using Libres.API.Shared.Application.CustomError;
using Libres.API.Shared.Application.Mediator;

namespace Libres.API.Shared.Application.PipLines
{
    public class ValidationStep<TRequest, TResponse> : IPipelineStep<TRequest, TResponse> where TResponse : IFailureResult<TResponse>
    {
        private readonly IValidator<TRequest> _validator;
        public ValidationStep(IValidator<TRequest> validator)
        {
            _validator = validator;
        }
        public async Task<TResponse> HandleAsync(TRequest request, Func<Task<TResponse>> next, CancellationToken cancellationToken)
        {

            var context = new ValidationContext<TRequest>(request);
            var validationResult = await _validator.ValidateAsync(context, cancellationToken);

            if (!validationResult.IsValid)
            {
                var error = validationResult.Errors.FirstOrDefault()?.ErrorMessage ?? "";

                return TResponse.Failure(error);
            }

            return await next();
        }


    }
}