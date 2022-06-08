using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using RestPanda.Requests;
using RestPanda.Requests.Attributes;
using TouristСenterLibrary.Entity;
using Trivial.Security;
using WebServer.Models;

namespace WebServer.Requests
{
    [RequestHandlerPath("/auth")]
    public class AuthHandler : RequestHandler
    {
        private string GenerateToken(User user)
        {
            var model = new JsonWebTokenPayload
            {
                Id = Guid.NewGuid().ToString("n"),
                Issuer = $"{user.Login}",
                Expiration = DateTime.Now + new TimeSpan(365, 0, 0, 0)
            };
            var jwt = new JsonWebToken<JsonWebTokenPayload>(model, Program.Sign);

            var jwtStr = jwt.ToEncodedString();
            return jwtStr;
        }

        [Post("/signin")]
        public void LoginUser()
        {

            var body = Bind<AuthModel>();
            if (body is null || string.IsNullOrEmpty(body.login) || string.IsNullOrEmpty(body.password))
            {
                Send(new AnswerModel(false, null, 400, "incorrect request"));
                return;
            }

            var client = User.GeUserAuth(body.login, body.password);
            if (client is null)
            {
                Send(new AnswerModel(false, null, 401, "incorrect request body"));
                return;
            }

            Send(new AnswerModel(true, new { access_token = GenerateToken(client), user = client }, null, null));
        }

        [Post("/signon")]
        public void RegisterUser()
        {
            
            var body = Bind<RegModel>();
            if (RegModel.Check(body))
            {
                Send(new AnswerModel(false, null, 401, "incorrect request"));
                return;
            }
            User user;
            if (!User.IsHasUser(body.phone))
            {
                user = new User(body!.surname, body.name, body.phone)
                {
                    NameOfCompany = body.nameOfCompany == "" ? null : body.nameOfCompany,
                    Middlename = body.middlename == "" ? null : body.middlename,
                    Email = body.email == "" ? null : body.email,
                    Login = body.login,
                    Password = body.password
                };
                var team = new Team("Моя команда", user);
                if (!user.Add() || !team.Add())
                {
                    Send(new AnswerModel(false, null, 401, "incorrect request"));
                    return;
                }
            }
            else
            {
                user = User.GetUserByPhoneNumber(body.phone);
            }
            Send(new AnswerModel(true, new { access_token = GenerateToken(user), user = user }, null, null));
        }
    }
}
