using System;

Console.WriteLine("=== Objects ===");

var customer = new Customer();

customer.Name = "Maria";
customer.MonthlyFee = 50;

Console.WriteLine(customer.Name);
Console.WriteLine(customer.MonthlyFee);

var customer2 = customer;

customer2.Name = "George";

Console.WriteLine();
Console.WriteLine(customer.Name);
Console.WriteLine(customer2.Name);

public class Customer
{
    public int Id { get; set; }

    public string Name { get; set; } = string.Empty;

    public decimal MonthlyFee { get; set; }
}