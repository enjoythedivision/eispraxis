using Eispraxis.Api.DTOs;
using Eispraxis.Api.Services;
using Microsoft.AspNetCore.Mvc;

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
    public async Task<IActionResult> GetCustomers()
    {
        var customers = await _customerService.GetCustomersAsync();

        return Ok(customers);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetCustomer(int id)
    {
        var customer = await _customerService.GetCustomerByIdAsync(id);

        if (customer == null)
        {
            return NotFound();
        }

        return Ok(customer);
    }

    [HttpPost]
    public async Task<IActionResult> CreateCustomer(
        CreateCustomerRequest request)
    {
        var customer = await _customerService.CreateCustomerAsync(
            request.Name,
            request.MonthlyFee);

        return CreatedAtAction(
            nameof(GetCustomer),
            new { id = customer.Id },
            customer);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateCustomer(
        int id,
        UpdateCustomerRequest request)
    {
        var customer = await _customerService.UpdateCustomerAsync(
            id,
            request.Name,
            request.MonthlyFee);

        if (customer == null)
        {
            return NotFound();
        }

        return Ok(customer);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteCustomer(int id)
    {
        var deleted = await _customerService.DeleteCustomerAsync(id);

        if (!deleted)
        {
            return NotFound();
        }

        return NoContent();
    }

    [HttpPatch("{id}/payments/{year}/{month}")]
    public async Task<IActionResult> TogglePayment(
    int id,
    int year,
    int month)
    {
        var payment = await _customerService.TogglePaymentAsync(id, year, month);

        if (payment == null)
        {
            return NotFound();
        }

        return Ok(payment);
    }

    [HttpGet("{customerId}/notes")]
    public async Task<IActionResult> GetNotes(int customerId)
    {
        var notes = await _customerService.GetNotesAsync(customerId);
        return Ok(notes);

    }

    [HttpPost("{customerId}/notes")]
    public async Task<IActionResult> CreateNoteAsync(
    int customerId,
    CreateNoteRequest request)
    {
        var note = await _customerService.CreateNoteAsync(
            customerId,
            request.Content);

        return Ok(note);
    }

    [HttpDelete("{customerId}/notes/{noteId}")]
    public async Task<IActionResult> DeleteNoteAsync(int customerId, int noteId)
    {
        var note = await _customerService.DeleteNoteAsync(customerId, noteId);
        if (note != null)
        {
            return NoContent();
        }
        return NotFound();
    }
}