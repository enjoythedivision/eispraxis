using Eispraxis.Api.DTOs;
using Eispraxis.Api.Services;
using Microsoft.AspNetCore.Mvc;
using System.Xml.Linq;
namespace Eispraxis.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CustomersController : ControllerBase
{

    private readonly CustomerService _customerService;
    public CustomersController(CustomerService customerService)
    {
        _customerService = customerService;
    }

    [HttpGet]
    public IActionResult GetCustomers()
    {
        var customers = _customerService.GetCustomers();
        return Ok(customers);
    }

    [HttpPost]
    public IActionResult CreateCustomer(CreateCustomerRequest request)
    {
        var customer = _customerService.CreateCustomer(request.Name, request.MonthlyFee);

        return Ok(customer);
    }
}