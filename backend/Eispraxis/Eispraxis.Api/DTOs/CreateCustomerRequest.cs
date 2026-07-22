namespace Eispraxis.Api.DTOs;

public class CreateCustomerRequest
{
    public string Name { get; set; } = string.Empty;
    public int MonthlyFee { get; set; }
}