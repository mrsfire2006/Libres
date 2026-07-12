using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Text.Json.Serialization;
using System.Text.Json.Serialization.Metadata;
using System.Threading.Tasks;
using Libres.API.Features.Books.Application.Commands.Create;
using Libres.API.Features.Books.Application.Commands.Delete;
using Libres.API.Features.Books.Application.Commands.UpdateStatus;
using Libres.API.Features.Books.Application.Common;
using Libres.API.Features.Books.Application.Queries.Books;
using Libres.API.Features.Categories.Application.Commands.Add;
using Libres.API.Features.Categories.Application.Commands.Edit;
 using Libres.API.Features.Users.Application.Commands.Login;
using Libres.API.Features.Users.Application.Commands.Register;
using Libres.API.Features.Users.Application.Common;
using Libres.API.Shared.Application.CustomError;

namespace Libres.API.Common
{

    [JsonSerializable(typeof(Result<BookResponse>))]
    [JsonSerializable(typeof(Result<IEnumerable<BookResponse>>))]

    [JsonSerializable(typeof(Result<SigninResponse>))]
 
     [JsonSerializable(typeof(Result<string>))]
    [JsonSerializable(typeof(Result<BookResponse>))]
    [JsonSerializable(typeof(Result<IEnumerable<BookResponse>>))]
    [JsonSerializable(typeof(RegisterRequestCommand))]
    [JsonSerializable(typeof(LoginRequestCommand))]
    [JsonSerializable(typeof(EditCategoryRequestCommand))]
    [JsonSerializable(typeof(AddCategoryRequestCommand))]
    [JsonSerializable(typeof(CreateBookRequest))]
    [JsonSerializable(typeof(DeleteBookRequestCommand))]
    [JsonSerializable(typeof(UpdateStatusRequestCommand))]
    [JsonSerializable(typeof(BooksRequestQuery))]
    public partial class AppJsonSerializerContext : JsonSerializerContext
    {

    }
}