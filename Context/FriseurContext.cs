using AureliaFriseur.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace AureliaFriseur.Context
{
    public class FriseurContext : IdentityDbContext<ApplicationUser>
    {
        public FriseurContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Customer> Customers { get; set; }
    }
}
