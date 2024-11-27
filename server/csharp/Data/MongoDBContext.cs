using MongoDB.Driver;
using RequestBroker.Models;

namespace RequestBroker.Data
{
    public class MongoDBContext 
    {
        private readonly IMongoDatabase _database;

        public MongoDBContext(IConfiguration configuration) {
            var client = new MongoClient(configuration.GetConnectionString("MongoDb"));
            _database = client.GetDatabase("request-broker");
        }

        public IMongoCollection<Archive> Archives => _database.GetCollection<Archive>("Archives");
        public IMongoCollection<Queue> Queues => _database.GetCollection<Queue>("Queues");
    }
}