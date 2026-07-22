namespace Eispraxis.Api.DTOs;

public class DashboardSummaryResponse
{
    public decimal ReceivedRevenue { get; set; }
    public decimal ExpectedRevenue { get; set; }
    public decimal CollectionRate { get; set; }
    public int PaidCustomers { get; set; }
    public int UnpaidCustomers { get; set; }
}
