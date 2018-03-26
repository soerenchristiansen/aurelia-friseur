using System.Collections.Generic;
using System.Threading.Tasks;
using AureliaFriseur.Models;

namespace AureliaFriseur.Services
{
    public interface ICustomersService
    {
        Task<List<Customer>> GetCustomers();
        Task<bool> SaveCustomer(Customer customer);
        Task<bool> DeleteCustomer(int id);
    }
}