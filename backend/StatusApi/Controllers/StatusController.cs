using Microsoft.AspNetCore.Mvc;

namespace StatusApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class StatusController : ControllerBase
    {
        [HttpGet("hello")]
        public IActionResult GetHello()
        {
            Console.WriteLine("Hello Endpoint Called");
            return Ok("Hello from Updated .NET Backend🚀");
        }

        [HttpGet("time")]
        public IActionResult GetTime()
        {
            Console.WriteLine("Time Endpoint Called");
            return Ok(DateTime.Now.ToString());
        }

        [HttpGet("env")]
        public IActionResult GetEnv()
        {
            Console.WriteLine("Environment Endpoint Called");
            return Ok(new
            {
                MachineName = Environment.MachineName,
                OS = Environment.OSVersion.ToString()
            });
        }
    }
}
