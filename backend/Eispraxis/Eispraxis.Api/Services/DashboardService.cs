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
            .Where(customer => !customer.IsArchived)
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
        var customers = await _context.Customers
            .Where(c => !c.IsArchived)
            .Include(c => c.Payments)
            .ToListAsync();
        var totalCustomers = customers.Count;
        var expectedRevenue = 0m;

        var paidCustomersCount = 0;
        var receivedRevenue = 0m;
        var paymentsWithoutRecordedFee = 0;

        foreach (var customer in customers)
        {
            var payment = customer.Payments.FirstOrDefault(p =>
                p.Year == year &&
                p.Month == month &&
                p.IsPaid);

            if (payment != null)
            {
                paidCustomersCount++;
                receivedRevenue += payment.PaidFee ?? 0;
                expectedRevenue += payment.PaidFee ?? 0;
                if (payment.PaidFee == null) paymentsWithoutRecordedFee++;
            }
            else
            {
                expectedRevenue += customer.MonthlyFee;
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
            UnpaidCustomers = unpaidCustomersCount,
            PaymentsWithoutRecordedFee = paymentsWithoutRecordedFee
        };
    }
}
