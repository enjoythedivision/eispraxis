using Eispraxis.Api.Models;

namespace Eispraxis.Api.Services;

public class CustomerService
{
    private readonly List<Customer> _customers = new()
    {
        new Customer("Maria", 50),
        new Customer("John", 75)
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
}