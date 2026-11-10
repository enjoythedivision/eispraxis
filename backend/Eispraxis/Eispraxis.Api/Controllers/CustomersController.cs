using Eispraxis.Api.DTOs;
using Eispraxis.Api.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;

namespace Eispraxis.Api.Controllers;

[Authorize]
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
    public async Task<IActionResult> GetCustomers([FromQuery] bool archived = false)
    {
        var customers = await _customerService.GetCustomersAsync(archived);

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
    public async Task<IActionResult> ArchiveCustomer(int id)
    {
        var archived = await _customerService.ArchiveCustomerAsync(id);

        if (!archived)
        {
            return NotFound();
        }

        return NoContent();
    }

    [HttpPatch("{id}/restore")]
    public async Task<IActionResult> RestoreCustomer(int id)
    {
        var restored = await _customerService.RestoreCustomerAsync(id);

        if (!restored)
        {
            return NotFound();
        }

        return NoContent();
    }

    [HttpPatch("{id}/payments/{year}/{month}")]
    public async Task<IActionResult> SetPaymentStatus(
        int id,
        int year,
        int month,
        UpdatePaymentRequest request)
    {
        if (request.IsPaid == null || year < 2024 || year > 9999 || month < 1 || month > 12)
        {
            return BadRequest("Send isPaid (true or false), a year from 2024, and a month from 1 to 12.");
        }

        try
        {
            var payment = await _customerService.SetPaymentStatusAsync(
                id, year, month, request.IsPaid.Value);

            if (payment == null)
            {
                return NotFound();
            }

            return Ok(payment);
        }
        catch (DbUpdateException exception) when (
            exception.InnerException is SqlException sql &&
            (sql.Number == 2601 || sql.Number == 2627))
        {
            // Two people may try to create the same month at the same time.
            return Conflict("This month was saved by another user. Reload and try again.");
        }
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
