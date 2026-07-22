using Eispraxis.Api.Data;
using Eispraxis.Api.DTOs;
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

    public async Task<DashboardSummaryResponse> GetDashboardSummaryAsync(
        int year,
        int month)
    {
        var customers = await _context.Customers.ToListAsync();
        var totalCustomers = customers.Count;
        var expectedRevenue = customers.Sum(c => c.MonthlyFee);

        var paidCustomersCount = 0;
        var receivedRevenue = 0m;

        foreach (var customer in customers)
        {
            var hasPaidThisMonth = customer.Payments.Any(p =>
                p.Year == year &&
                p.Month == month &&
                p.IsPaid);

            if (hasPaidThisMonth)
            {
                paidCustomersCount++;
                receivedRevenue += customer.MonthlyFee;
            }
        }

        var unpaidCustomersCount = totalCustomers - paidCustomersCount;
        var collectionRate = expectedRevenue > 0 
            ? Math.Round((receivedRevenue / expectedRevenue) * 100, 2)
            : 0;

        return new DashboardSummaryResponse
        {
            ReceivedRevenue = receivedRevenue,
            ExpectedRevenue = expectedRevenue,
            CollectionRate = collectionRate,
            PaidCustomers = paidCustomersCount,
            UnpaidCustomers = unpaidCustomersCount
        };
    }
}