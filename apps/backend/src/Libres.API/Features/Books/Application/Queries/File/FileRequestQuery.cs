using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Permissions;
using System.Text.Json.Serialization;
using System.Threading.Tasks;
using Libres.API.Features.Books.Application.Common;
using Libres.API.Shared.Application.CustomError;
using Libres.API.Shared.Application.Mediator;
using Libres.API.Shared.Domain.Enums;
using Microsoft.AspNetCore.Mvc.ModelBinding;

namespace Libres.API.Features.Books.Application.Queries.File
{
    public record FileRequestQuery(Guid BookId) : ICustomRequest<Result<FileResponse>>
    {
        [JsonIgnore]
        [BindNever]
        public Guid UserId { get; set; }


 
    };

}