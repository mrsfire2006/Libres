using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;
using Libres.API.Shared.Application.CustomError;
using Libres.API.Shared.Application.RequestBuilder;
using Microsoft.Extensions.DependencyInjection;

namespace Libres.API.Shared.Application.Mediator
{
    public class CustomMediator
    {

        private readonly IServiceProvider _serviceProvider;
        private static readonly ConcurrentDictionary<Type, MethodInfo> _handleMethodCache = new();

        public CustomMediator(IServiceProvider serviceProvider) => _serviceProvider = serviceProvider;


        public async Task<TResponse> SendAsync<TRequest, TResponse>(TRequest request, Action<RequestPipelineBuilder<TRequest, TResponse>>? configurePipeline = null, CancellationToken cancellationToken = default)
                where TRequest : ICustomRequest<TResponse>  
        {
            Func<Task<TResponse>> coreHandler = async () =>
                {
                    var handler = _serviceProvider.GetRequiredService<ICustomRequestHandler<TRequest, TResponse>>();
                    return await handler.HandleAsync(request, cancellationToken);
                };
            var builder = new RequestPipelineBuilder<TRequest, TResponse>();

            if (configurePipeline != null)
            {
                configurePipeline(builder);
            }



            return await builder.ExecuteAsync(request, coreHandler, cancellationToken);
        }
        public async Task PublishAsync(object notification, CancellationToken cancellationToken = default)
        {
            if (notification is null)
                throw new ArgumentNullException(nameof(notification));

            if (notification is not ICustomNotification)
                throw new InvalidOperationException($"{notification.GetType().Name} لازم يطبق ICustomNotification.");

            Type notificationType = notification.GetType();
            Type handlerType = typeof(ICustomNotificationHandler<>).MakeGenericType(notificationType);

            var handlers = _serviceProvider.GetServices(handlerType).Where(h => h is not null).ToList();

            if (handlers.Count == 0)
                return;

            var method = _handleMethodCache.GetOrAdd(handlerType, t => t.GetMethod("HandleAsync")!);

            var tasks = handlers.Select(handler =>
                (Task)method.Invoke(handler, new object[] { notification, cancellationToken })!);

            await Task.WhenAll(tasks);
        }


    }
}