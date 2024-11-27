using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace RequestBroker.Models
{
    [BsonIgnoreExtraElements]
    public class Queue
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; } // Поле `_id` в MongoDB

        [BsonElement("url")]
        public string? Url { get; set; }

        [BsonElement("method")]
        public string? Method { get; set; }

        [BsonElement("body")]
        [BsonIgnoreIfNull]
        public Dictionary<string, object>? Body { get; set; }

        [BsonElement("query")]
        [BsonIgnoreIfNull]
        public Dictionary<string, string>? Query { get; set; }

        [BsonElement("status")]
        public string? Status { get; set; }

        [BsonElement("retry_count")]
        public int RetryCount { get; set; }

        [BsonElement("createdAt")]
        public DateTime CreatedAt { get; set; }

        [BsonElement("updatedAt")]
        public DateTime UpdatedAt { get; set; }
    }
}
