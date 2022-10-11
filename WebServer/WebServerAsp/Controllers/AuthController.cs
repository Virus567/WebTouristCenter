using System.ComponentModel.DataAnnotations;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Microsoft.AspNetCore.Mvc;
using WebServerAsp.Models;
using WebServerAsp.Repositories;
namespace WebServerAsp.Controllers
{
    [ApiController]
    [Route("auth")]
    public class AuthController:ControllerBase
    {
        private readonly IUserRepository _userRepository;
        public AuthController(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        private static JwtSecurityToken GenAccessToken(int id)
        {
            return new JwtSecurityToken(issuer: AuthOptions.ISSUER, audience: AuthOptions.AUDIENCE,
                expires: DateTime.UtcNow.Add(TimeSpan.FromDays(1)), claims: new[] { new Claim("user", id.ToString()) },
                signingCredentials: AuthOptions.SigningCredentials);
        }

        [HttpPost("signin")]
        public IActionResult Login(AuthModel model)
        {
            var user = _userRepository.GetUserAuth(model.login, model.password);
            if (user is null) return BadRequest("Incorrect login or password");
            var jwt = GenAccessToken(user.ID);
            return Ok(new { AccessToken = new JwtSecurityTokenHandler().WriteToken(jwt), user = new UserModel(user) });
        }

        [HttpPost("signon")]

        public IActionResult Register(RegModel model)
        {
            if (!_userRepository.RegisterUser(model))
            {
                return BadRequest("Error adding");
            }
            var user = _userRepository.GetUserByLogin(model.login);
            if (user is null) return BadRequest("Error adding");
            var jwt = GenAccessToken(user.ID);
            return Ok(new { AccessToken = new JwtSecurityTokenHandler().WriteToken(jwt), user = new UserModel(user) });
        }
    }
}
