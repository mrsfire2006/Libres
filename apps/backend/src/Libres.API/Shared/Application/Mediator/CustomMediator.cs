using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.DependencyInjection;

namespace Libres.API.Shared.Application.Mediator
{
    public class CustomMediator
    {

        private readonly IServiceProvider _serviceProvider;

        public CustomMediator(IServiceProvider serviceProvider) => _serviceProvider = serviceProvider;




        public async Task<TResponse> SendAsync<TResponse>(ICustomRequest<TResponse> request, CancellationToken cancellationToken = default)
        {
            Type requestType = request.GetType();
            Type handlerType = typeof(ICustomRequestHandler<,>).MakeGenericType(requestType, typeof(TResponse));
            var handler = _serviceProvider.GetRequiredService(handlerType);

            if (handler == null)
                throw new InvalidOperationException($"No handler registered for {requestType.Name}");

            var method = handlerType.GetMethod("HandleAsync");
            return await (Task<TResponse>)method!
            .Invoke(handler, new object[] { request, cancellationToken })!;

        }
        public Task PublishAsync(object notification, CancellationToken cancellationToken = default)
        {
            throw new NotImplementedException();
        }


    }
}