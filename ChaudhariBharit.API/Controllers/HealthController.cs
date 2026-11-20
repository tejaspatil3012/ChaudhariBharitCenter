using Microsoft.AspNetCore.Mvc;

namespace ChaudhariBharit.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class HealthController : ControllerBase
{
    [HttpGet]
    public IActionResult Get()
    {
        return Ok(new
        {
            status = "Online",
            service = "Chaudhari Bharit Center Web API",
            version = "1.0.0",
            timestamp = DateTime.UtcNow
        });
    }
}
