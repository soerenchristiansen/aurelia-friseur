using System.Collections.Generic;
using System.Threading.Tasks;
using AureliaFriseur.Models;
using AureliaFriseur.Services;
using Microsoft.AspNetCore.Mvc;

namespace AureliaFriseur.Controllers
{
    [Route("api/[controller]")]
    public class CustomersController : Controller
    {
        private readonly ICustomersService _customersService;

        public CustomersController(ICustomersService customersService)
        {
            _customersService = customersService;
        }

        [HttpGet("[action]")]
        public async Task<List<Customer>> GetCustomers()
        {
            var customers = await _customersService.GetCustomers();

            return customers;
        }

        [HttpPost("[action]")]
        public async Task<bool> CreateCustomer([FromBody] Customer customer)
        {
            return await _customersService.SaveCustomer(customer);
        }

        [HttpDelete("[action]/{id}")]
        public async Task<bool> DeleteCustomer(int id)
        {
            return await _customersService.DeleteCustomer(id);
        }
    }
}
