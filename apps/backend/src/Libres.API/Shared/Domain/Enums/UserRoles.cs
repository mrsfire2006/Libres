using System.Text.Json.Serialization;

namespace Libres.API.Shared.Domain.Enums
{
    [Flags]
    [JsonConverter(typeof(JsonStringEnumConverter<UserRoles>))]
    public enum UserRoles
    {
        Reader = 1,
        Author = 2,
        Admin = 4,
        SuperAdmin = 8,
    }
}