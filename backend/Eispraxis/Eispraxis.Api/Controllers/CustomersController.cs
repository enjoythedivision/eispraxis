using Eispraxis.Api.DTOs;
using Eispraxis.Api.Services;
using Microsoft.AspNetCore.Mvc;
using System.Xml.Linq;
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

    [HttpPost]
    public IActionResult CreateCustomer(CreateCustomerRequest request)
    {
        var service = new CustomerService();
        var customer = service.CreateCustomer(request.Name, request.MonthlyFee);
        return Ok(customer);
    }
}