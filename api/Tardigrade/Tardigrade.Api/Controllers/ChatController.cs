using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Tardigrade.Api.Hubs;
using Tardigrade.Logic.DTO;

namespace Tardigrade.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ChatController : ControllerBase
    {
        private readonly IHubContext<ChatHub> _hubContext;

        public ChatController(IHubContext<ChatHub> hubContext)
        {
            _hubContext = hubContext;
        }

        [Route("Send")]
        [HttpPost]
        public IActionResult SendRequest([FromBody] MessageDTO msg)
        {
            _hubContext.Clients.All.SendAsync("ReceiveOne", msg.user, msg.message);
            return Ok();
        }
    }
}
