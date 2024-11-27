namespace RequestBroker.Models
{
    public class RequestDto
    {
        public string Url { get; set; } = string.Empty;
        public string Method { get; set; } = "GET";
        public Dictionary<string, object>? Body { get; set; }
        public Dictionary<string, string>? Query { get; set; }
    }
}
