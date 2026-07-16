using Eispraxis.Api.Data;
using Eispraxis.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace Eispraxis.Api.Services;

public class DashboardService
{
    private readonly ApplicationDbContext _context;

    public DashboardService(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<List<Customer>> GetUnpaidCustomersAsync(
        int year,
        int month)
    {
        return await _context.Customers
            .Where(customer =>
                !customer.Payments.Any(payment =>
                    payment.Year == year &&
                    payment.Month == month &&
                    payment.IsPaid))
            .ToListAsync();
    }
}