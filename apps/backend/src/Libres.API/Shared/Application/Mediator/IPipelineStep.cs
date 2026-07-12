using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Libres.API.Shared.Application.Mediator
{
    public interface IPipelineStep<TRequest, TResponse>
    {
        Task<TResponse> HandleAsync(TRequest request, Func<Task<TResponse>> next, CancellationToken cancellationToken);
    }
}