using Eispraxis.Api.Models;

namespace Eispraxis.Api.Services;

public class CustomerService
{
    private readonly List<Customer> _customers = new()
{
    new Customer("Maria", 50) { Id = 1 },
    new Customer("John", 75) { Id = 2 }
};

    public List<Customer> GetCustomers()
    {
        return _customers;
    }

    public Customer CreateCustomer(string name, int monthlyFee)
    {
        var customer = new Customer(name, monthlyFee);
        _customers.Add(customer);

        return customer;

    }

    public Customer? UpdateCustomer(int id, string name, int monthlyFee)
    {
        var customer = _customers.FirstOrDefault(c => c.Id == id);

        if (customer == null)
        {
            return null;
        }

        customer.Name = name;
        customer.MonthlyFee = monthlyFee;

        return customer;
    }

    public bool DeleteCustomer(int id)
    {
        var customer = _customers.FirstOrDefault(c => c.Id == id);

        if (customer == null)
        {
            return false;
        }

        _customers.Remove(customer);

        return true;
    }
}