namespace Eispraxis.Api.Models
{

    public class Note
    {
        public Note(string content, int customerId)
        {
            this.Content = content;
            this.CustomerId = customerId;
        }
        public int Id { get; set; }
        public int CustomerId { get; set; }
        public string Content { get; set; } = "";
        public Customer Customer { get; set; } = null!;
    }
}

