

using System.Text.Json.Serialization;

namespace Libres.API.Shared.Domain.Enums
{
    [JsonConverter(typeof(JsonStringEnumConverter<BookStatus>))]
    public enum BookStatus
    {
        Accepted = 1,
        Rejected = 2,
        Pending = 3
    }
}