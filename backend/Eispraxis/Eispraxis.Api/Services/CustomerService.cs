using Eispraxis.Api.Models;

namespace Eispraxis.Api.Services;

public class CustomerService
{
    public List<Customer> GetCustomers()
    {
        return new List<Customer>
        {
            new Customer("Maria", 50),
            new Customer("John", 75)
        };
    }
}