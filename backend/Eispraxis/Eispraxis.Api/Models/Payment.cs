namespace Eispraxis.Api.Models;
using System.Text.Json.Serialization;

public class Payment
{
    public int Id { get; set; }

    public int CustomerId { get; set; }

    public int Year { get; set; }

    public int Month { get; set; }

    public bool IsPaid { get; set; }

    public DateTime? PaidAt { get; set; }

    [JsonIgnore]
    public Customer Customer { get; set; } = null!;
}