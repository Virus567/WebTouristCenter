﻿using TouristСenterLibrary.Entity;
using Trivial.Security;

namespace WebServer;

public static class TokenWorker
{
    internal static bool CheckToken(string token)
    {
        var parser = new JsonWebToken<JsonWebTokenPayload>.Parser(token);
        return parser.Verify(Program.Sign) && parser.GetPayload().Expiration > DateTime.Now;
    }

    internal static User? GetUserByToken(string token)
    {
        var parser = new JsonWebToken<JsonWebTokenPayload>.Parser(token);
        var login = parser.GetPayload().Issuer;
        return User.GetUserByLogin(login);
    }
}
