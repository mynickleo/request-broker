using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using RequestBroker.Models;
using RequestBroker.Services;

namespace RequestBroker.Controllers
{
    [ApiController]
    [Route("api/")]
    [EnableCors("AllowLocalhost")]
    public class RequestBrokerController : ControllerBase
    {
        private readonly RequestBrokerService _requestBrokerService;

        public RequestBrokerController(RequestBrokerService requestBrokerService)
        {
            _requestBrokerService = requestBrokerService;
        }

        [HttpPost("queue")]
        public async Task<IActionResult> PostRequest([FromBody] RequestDto requestDto)
        {
            await _requestBrokerService.ProcessRequestAsync(requestDto);
            return Ok("Request has been added to the queue and will be processed.");
        }

        [HttpGet("archive")]
        public async Task<IActionResult> GetArchive()
        {
            var archive = await _requestBrokerService.GetArchiveAsync();
            var total = archive.Count;
            var response = new PaginatedResponse<Archive>(archive, total);
            return Ok(response);
        }

        [HttpGet("queue")]
        public async Task<IActionResult> GetQueue()
        {
            var queue = await _requestBrokerService.GetQueueAsync();
            var total = queue.Count;
            var response = new PaginatedResponse<Queue>(queue, total);
            return Ok(response);
        }

        [HttpDelete("archive")]
        public async Task<IActionResult> DeleteAllArchiveItems()
        {
            await _requestBrokerService.DeleteAllArchiveItemsAsync();
            return Ok("All archive items have been deleted.");
        }
    }
}
