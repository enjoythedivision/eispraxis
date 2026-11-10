namespace Eispraxis.Api.DTOs;

public class UpdatePaymentRequest
{
    // Nullable so we can reject requests that forget to send a status.
    public bool? IsPaid { get; set; }
}
