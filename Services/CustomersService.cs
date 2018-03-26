using System.Collections.Generic;
using System.Threading.Tasks;
using AureliaFriseur.Context;
using AureliaFriseur.Models;
using Microsoft.EntityFrameworkCore;

namespace AureliaFriseur.Services
{
    public class CustomersService : ICustomersService
    {
        private readonly FriseurContext _dbContext;

        public CustomersService(FriseurContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<List<Customer>> GetCustomers()
        {
            return await _dbContext.Customers.ToListAsync();
        }

        public async Task<bool> SaveCustomer(Customer customer)
        {
            var existingCustomer = await _dbContext.Customers.FirstOrDefaultAsync(x => x.Id == customer.Id);

            if (existingCustomer == null)
            {
                _dbContext.Customers.Add(customer);
            }
            else
            {
                existingCustomer.Name = customer.Name;
                existingCustomer.City = customer.City;
                existingCustomer.LastName = customer.LastName;
            }

            await _dbContext.SaveChangesAsync();

            return true;
        }

        public async Task<bool> DeleteCustomer(int id)
        {
            var existingCustomer = await _dbContext.Customers.FirstOrDefaultAsync(x => x.Id == id);

            if (existingCustomer == null) return false;

            _dbContext.Customers.Remove(existingCustomer);
            await _dbContext.SaveChangesAsync();
            return true;
        }
    }
}
