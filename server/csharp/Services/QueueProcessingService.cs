using MongoDB.Driver;
using RequestBroker.Models;

namespace RequestBroker.Services
{
    public class QueueProcessingService : BackgroundService
    {
        private readonly HttpClientService _httpClientService;
        private readonly IServiceScopeFactory _scopeFactory;
        private readonly ILogger<QueueProcessingService> _logger;

        private const int MaxRetryCount = 3;

        public QueueProcessingService(HttpClientService httpClientService, IServiceScopeFactory scopeFactory, ILogger<QueueProcessingService> logger)
        {
            _httpClientService = httpClientService;
            _scopeFactory = scopeFactory;
            _logger = logger;
        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            while (!stoppingToken.IsCancellationRequested)
            {
                using (var scope = _scopeFactory.CreateScope())
                {
                    var database = scope.ServiceProvider.GetRequiredService<IMongoDatabase>();
                    var queueCollection = database.GetCollection<Queue>("queue");
                    var archiveCollection = database.GetCollection<Archive>("archive");

                    var queueItem = await queueCollection.Find(q => q.Status == "pending").FirstOrDefaultAsync(stoppingToken);

                    if (queueItem != null)
                    {
                        var success = await ProcessQueueItemWithRetryAsync(queueItem, queueCollection, archiveCollection, stoppingToken);

                        if (!success)
                        {
                            _logger.LogError($"Request {queueItem.Id} failed after {MaxRetryCount} retries.");
                            await ArchiveRequestAsync(queueItem, "failed", archiveCollection);
                        }

                        await queueCollection.DeleteOneAsync(q => q.Id == queueItem.Id);
                    }
                }

                await Task.Delay(5000, stoppingToken);
            }
        }

        private async Task<bool> ProcessQueueItemWithRetryAsync(Queue queueItem, IMongoCollection<Queue> queueCollection, IMongoCollection<Archive> archiveCollection, CancellationToken stoppingToken)
        {
            int retryCount = MaxRetryCount;

            while (retryCount > 0)
            {
                try
                {
                    var response = await _httpClientService.SendRequestAsync(queueItem.Url, queueItem.Method, queueItem.Body);

                    if (response.IsSuccessStatusCode)
                    {
                        queueItem.Status = "success";
                        await ArchiveRequestAsync(queueItem, "success", archiveCollection);
                        return true;
                    }

                    _logger.LogWarning($"Request {queueItem.Id} failed with status {response.StatusCode}. Retrying...");
                }
                catch (HttpRequestException ex)
                {
                    _logger.LogError(ex, $"Error processing request {queueItem.Id}. Retrying...");
                }

                retryCount--;
                if (retryCount > 0)
                {
                    await Task.Delay(2000);
                }
            }

            return false;
        }

        private async Task ArchiveRequestAsync(Queue queueItem, string status, IMongoCollection<Archive> archiveCollection)
        {
            var archiveItem = new Archive
            {
                Url = queueItem.Url,
                Method = queueItem.Method,
                Body = queueItem.Body,
                Query = queueItem.Query,
                Status = status
            };

            await archiveCollection.InsertOneAsync(archiveItem);
        }
    }
}
