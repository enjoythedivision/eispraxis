using Microsoft.AspNetCore.Mvc;
using Eispraxis.Api.Services;
namespace Eispraxis.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CustomersController : ControllerBase
{
    [HttpGet]
    public IActionResult GetCustomers()
    {
        var service = new CustomerService();

        var customers = service.GetCustomers();

        return Ok(customers);
    }
}