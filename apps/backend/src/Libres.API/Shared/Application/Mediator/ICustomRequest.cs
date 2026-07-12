using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Libres.API.Shared.Application.RequestBuilder;

namespace Libres.API.Shared.Application.Mediator
{
    public interface ICustomRequest<out TResponse>;

    public interface ICustomRequest : ICustomRequest<bool>;






}