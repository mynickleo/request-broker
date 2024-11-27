using System.Text;
using System.Text.Json;

namespace RequestBroker.Services
{
    public class HttpClientService
    {
        private readonly HttpClient _httpClient;

        public HttpClientService(HttpClient httpClient)
        {
            _httpClient = httpClient;
        }

        public async Task<HttpResponseMessage> SendRequestAsync(string url, string method, object body)
        {
            var request = new HttpRequestMessage(new HttpMethod(method), url);

            if (body != null)
            {
                var json = JsonSerializer.Serialize(body);
                request.Content = new StringContent(json, Encoding.UTF8, "application/json");
            }

            return await _httpClient.SendAsync(request);
        }
    }
}
