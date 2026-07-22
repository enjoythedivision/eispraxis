using Eispraxis.Api.Data;
using Eispraxis.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace Eispraxis.Api.Services;

public class CustomerService
{
    private readonly ApplicationDbContext _context;

    public CustomerService(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<List<Customer>> GetCustomersAsync()
    {
        return await _context.Customers
            .Include(c => c.Payments)
            .ToListAsync();
    }

    public async Task<Customer?> GetCustomerByIdAsync(int id)
    {
        return await _context.Customers
            .Include(c => c.Payments)
            .FirstOrDefaultAsync(c => c.Id == id);
    }

    public async Task<Customer> CreateCustomerAsync(
        string name,
        int monthlyFee)
    {
        var customer = new Customer(name, monthlyFee);

        _context.Customers.Add(customer);

        await _context.SaveChangesAsync();

        return customer;
    }

    public async Task<Customer?> UpdateCustomerAsync(
        int id,
        string name,
        int monthlyFee)
    {
        var customer = await _context.Customers
            .FirstOrDefaultAsync(c => c.Id == id);

        if (customer == null)
        {
            return null;
        }

        customer.Name = name;
        customer.MonthlyFee = monthlyFee;

        await _context.SaveChangesAsync();

        return customer;
    }

    public async Task<bool> DeleteCustomerAsync(int id)
    {
        var customer = await _context.Customers
            .FirstOrDefaultAsync(c => c.Id == id);

        if (customer == null)
        {
            return false;
        }

        _context.Customers.Remove(customer);

        await _context.SaveChangesAsync();

        return true;
    }

    public async Task<Payment?> TogglePaymentAsync(
    int customerId,
    int year,
    int month)
    {
        var customerExists = await _context.Customers
            .AnyAsync(c => c.Id == customerId);

        if (!customerExists)
        {
            return null;
        }

        var payment = await _context.Payments
            .FirstOrDefaultAsync(p =>
                p.CustomerId == customerId &&
                p.Year == year &&
                p.Month == month);

        if (payment == null)
        {
            payment = new Payment
            {
                CustomerId = customerId,
                Year = year,
                Month = month,
                IsPaid = true,
                PaidAt = DateTime.UtcNow
            };

            _context.Payments.Add(payment);
        }
        else
        {
            payment.IsPaid = !payment.IsPaid;
            payment.PaidAt = payment.IsPaid
                ? DateTime.UtcNow
                : null;
        }

        await _context.SaveChangesAsync();

        return payment;
    }

    public async Task<List<Note>> GetNotesAsync(int customerId)
    {
        return await _context.Notes
            .Where(note => note.CustomerId == customerId)
            .ToListAsync();
    }

    public async Task<Note> CreateNoteAsync(int customerId, string content)
    {
        var note = new Note(content, customerId);
        _context.Notes.Add(note);
        await _context.SaveChangesAsync();
        return note;
    }
}