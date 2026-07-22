namespace Eispraxis.Api.Models
{
    public class Customer
    {
        public Customer(string name, int monthlyFee)
        {
            this.Name = name;
            this.MonthlyFee = monthlyFee;
        }

        public int Id { get; set; }
        public string Name { get; set; } = "";
        public int MonthlyFee { get; set; }

        public List<Payment> Payments { get; set; } = new();

        public List<Note> Notes { get; set; } = new();

    }
}
