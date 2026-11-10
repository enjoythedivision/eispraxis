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

    public async Task<Payment?> SetPaymentStatusAsync(
        int customerId,
        int year,
        int month,
        bool isPaid)
    {
        // 1. Find the customer so we can read their current fee.
        var customer = await _context.Customers
            .FirstOrDefaultAsync(c => c.Id == customerId);

        if (customer == null)
        {
            return null;
        }

        // 2. Find this month's record, or create it if it does not exist.
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
                Month = month
            };

            _context.Payments.Add(payment);
        }

        // 3. Only change the date and amount when the status actually changes.
        // Repeating "paid" must keep the original fee and date.
        if (payment.IsPaid != isPaid)
        {
            payment.IsPaid = isPaid;

            if (isPaid)
            {
                payment.PaidAt = DateTime.UtcNow;
                payment.PaidFee = customer.MonthlyFee;
            }
            else
            {
                payment.PaidAt = null;
                payment.PaidFee = null;
            }
        }

        // 4. Save the result in the database.
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

    public async Task<Note> DeleteNoteAsync(int customerId, int noteId)
    {
        var note = await _context.Notes
            .FirstOrDefaultAsync(n => n.CustomerId == customerId && n.Id == noteId);
        if (note != null)
        {
            _context.Notes.Remove(note);
            await _context.SaveChangesAsync();
        }
        return note;
    }

}
