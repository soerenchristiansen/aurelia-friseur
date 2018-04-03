using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using AureliaFriseur.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace AureliaFriseur.Controllers
{
    [Route("api/[controller]")]
    public class IdentityController : Controller
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;

        public IdentityController(UserManager<ApplicationUser> userManager, RoleManager<IdentityRole> roleManager)
        {
            _userManager = userManager;
            _roleManager = roleManager;
        }

        [HttpPost("[action]")]
        public async Task<bool> Register([FromBody]RegisterModel model)
        {
            var user = new ApplicationUser { UserName = model.Email, Email = model.Email};
            var result = await _userManager.CreateAsync(user, model.Password);
            if (result.Succeeded)
            {
                await AddToRole(user.UserName, "user");
            }

            return true;
        }

        [HttpPost("[action]")]
        public async Task<bool> CreateRole([FromBody]string roleName)
        {
            if (await _roleManager.RoleExistsAsync(roleName))
            {
                return true;
            }
            var role = new IdentityRole();
            role.Name = roleName;
            var result = await _roleManager.CreateAsync(role);
            if (result.Succeeded) 
            {
                return true;
            }

            return false;
        }

        private async Task AddToRole(string userName, string roleName)
        {
            var user = await _userManager.FindByNameAsync(userName);
            await _userManager.AddToRoleAsync(user, roleName);
        }

        private async Task AddClaims(string userName)
        {
            var user = await _userManager.FindByNameAsync(userName);
            var claims = new List<Claim> {
            };
            await _userManager.AddClaimsAsync(user, claims);
        }
    }
}