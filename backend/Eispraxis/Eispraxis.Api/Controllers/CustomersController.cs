using Microsoft.AspNetCore.Mvc;
using Eispraxis.Api.Models;

namespace Eispraxis.Api.Controllers;


[ApiController]
[Route("api/[controller]")]
public class CustomersController : ControllerBase
{
    [HttpGet]
    public IActionResult GetCustomers()
    {
        var customers = new List<Customer>
{
    new Customer
    {
        Id = 1,
        Name = "Maria",
        MonthlyFee = 50
    },

    new Customer
    {
        Id = 2,
        Name = "George",
        MonthlyFee = 40
    }
};

        return Ok(customers);
    }
}