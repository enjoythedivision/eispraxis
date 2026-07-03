using Microsoft.AspNetCore.Mvc;

namespace Eispraxis.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CustomersController : ControllerBase
{
    [HttpGet]
    public IActionResult GetCustomers()
    {
        return Ok(new[]
        {
            new
            {
                Id = 1,
                Name = "Maria",
                MonthlyFee = 50
            },
            new
            {
                Id = 2,
                Name = "George",
                MonthlyFee = 40
            }
        });
    }
}