using GlobitelSystem.Data;
using GlobitelSystem.DTO;
using Microsoft.AspNetCore.Identity;
using System.Threading.Tasks;

namespace GlobitelSystem.Services
{
    public interface IAccountService
    {
        Task<AppUser> FindByUsername(string email);
        Task<IdentityResult> Create(SignUpModel signup);
        Task<SignInResult> SignIn(LoginModel loginModel);
    }
}