using MongoDB.Driver;

using RequestBroker.Models;

namespace RequestBroker.Services
{
    public class RequestBrokerService
    {
        private readonly IMongoCollection<Queue> _queueCollection;
        private readonly IMongoCollection<Archive> _archiveCollection;
        private readonly HttpClientService _httpClientService;

        public RequestBrokerService(IMongoDatabase database, HttpClientService httpClientService)
        {
            _queueCollection = database.GetCollection<Queue>("queue");
            _archiveCollection = database.GetCollection<Archive>("archive");
            _httpClientService = httpClientService;
        }

        public async Task ProcessRequestAsync(RequestDto requestDto)
        {
            var queueItem = new Queue
            {
                Url = requestDto.Url,
                Method = requestDto.Method,
                Body = requestDto.Body,
                Query = requestDto.Query,
                Status = "pending",
                CreatedAt = DateTime.UtcNow
            };

            await _queueCollection.InsertOneAsync(queueItem);
        }

        public async Task<List<Archive>> GetArchiveAsync()
        {
            return await _archiveCollection.Find(_ => true).ToListAsync();
        }

        public async Task<List<Queue>> GetQueueAsync()
        {
            return await _queueCollection.Find(_ => true).ToListAsync();
        }

        public async Task DeleteAllArchiveItemsAsync()
        {
            await _archiveCollection.DeleteManyAsync(_ => true);
        }
    }
}
