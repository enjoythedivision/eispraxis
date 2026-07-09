namespace Eispraxis.Api.DTOs
{
    public class UpdateCustomerRequest
    {
        public string Name { get; set; } = string.Empty;
        public int MonthlyFee { get; set; }
    }
}
