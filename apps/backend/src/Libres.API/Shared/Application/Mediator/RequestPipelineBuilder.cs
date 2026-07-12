using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Libres.API.Shared.Application.CustomError;

namespace Libres.API.Shared.Application.Mediator
{
    public class RequestPipelineBuilder<TRequest, TResponse>
    {
        private readonly List<IPipelineStep<TRequest, TResponse>> _steps = new();



        public RequestPipelineBuilder<TRequest, TResponse> AddStep(IPipelineStep<TRequest, TResponse> step)
        {
            _steps.Add(step);
            return this;
        }

        public async Task<TResponse> ExecuteAsync(TRequest request, Func<Task<TResponse>> coreHandler, CancellationToken cancellationToken = default)
        {
            Func<Task<TResponse>> currentNext = coreHandler;

            for (int i = _steps.Count - 1; i >= 0; i--)
            {
                var step = _steps[i];
                var nextInChain = currentNext;

                currentNext = () => step.HandleAsync(request, nextInChain, cancellationToken);
            }

            return await currentNext();
        }
    }
}