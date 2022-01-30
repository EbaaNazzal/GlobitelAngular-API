using GlobitelSystem.DTO;
using GlobitelSystem.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace GlobitelSystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {

        IAccountService accountService;
        IConfiguration configuration;

        public AccountController(IAccountService _accountService , IConfiguration _configuration)
        {
            accountService = _accountService;
            configuration=_configuration;
        }

        [HttpPost]
        [Route("Register")]
        public async Task<IActionResult> Register(SignUpModel signUpModel)
        {
            var user = await accountService.FindByUsername(signUpModel.Email);
            if (user != null)
            {
                return Ok(new Response { Status = "Error", Message = "User Already Exists" });
            }
            else
            {
                var result = await accountService.Create(signUpModel);
                if (!result.Succeeded)
                {
                    return StatusCode(StatusCodes.Status500InternalServerError, new Response { Status = "Error", Message = "User Creation Failed" });
                }
                return Ok(new Response { Status = "Success", Message = "User Created Successfully" });
            }
        }

        [HttpPost]
        [Route("Login")]
        public async Task<IActionResult> Login(LoginModel loginModel)
        {
            var result = await accountService.SignIn(loginModel);
            if (result.Succeeded)
            {
                var user = await accountService.FindByUsername(loginModel.Email);

                var authClaims = new List<Claim>
                {
                    new Claim("user",user.UserName),
                    new Claim(JwtRegisteredClaimNames.Jti,Guid.NewGuid().ToString())
                };

                var authSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["JWTSettings:SecretKey"]));

                var token = new JwtSecurityToken(

                    expires: DateTime.Now.AddDays(15),
                    claims: authClaims,
                    signingCredentials: new SigningCredentials(authSigningKey, SecurityAlgorithms.HmacSha256)
                    );
                return Ok(new
                {
                    token = new JwtSecurityTokenHandler().WriteToken(token)
                });
            }
             return Unauthorized();
        }
    }
}
