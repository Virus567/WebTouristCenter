using TouristÑenterLibrary;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using WebServerAsp.Services;
using WebServerAsp.Repositories;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddControllers();
builder.Services.AddCors(o=>o.AddDefaultPolicy(b=>b.AllowAnyHeader().AllowAnyMethod().WithOrigins("http://localhost:3000").AllowCredentials()));
var connection = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddDbContext<ApplicationContext>(o=>o.UseNpgsql(connection));

builder.Services.AddTransient<IRouteRepository, RouteService>();
builder.Services.AddTransient<IInstructorRepository, InstructorService>();
builder.Services.AddTransient<IHikeRepository, HikeService>();
builder.Services.AddTransient<IUserRepository, UserService>();
builder.Services.AddTransient<IOrderRepository, OrderService>();

builder.Services.AddAuthorization();
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer(o => 
{
    o.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidIssuer = AuthOptions.ISSUER,
        ValidateAudience = true,
        ValidAudience = AuthOptions.AUDIENCE,
        ValidateLifetime = true,
        IssuerSigningKey = AuthOptions.GetSymmetricSecurityKey(),
        ValidateIssuerSigningKey = true
    };
});

var app = builder.Build();

app.Use(async (context, next) =>
{
    context.Response.Headers.Add("Access-Control-Allow-Origin", "*");
    context.Response.Headers.Add("Access-Control-Allow-Methods", "*");
    ////if(context.Request.Method == HttpMethods.Options)
    ////{
    //    context.Response.StatusCode = 200;
    //}  
    await next(context);
});

app.UseRouting();
app.UseAuthorization().UseAuthentication();
app.UseEndpoints(e => e.MapControllers());
app.UseCors();
app.Run();
public class AuthOptions
{
    public const string ISSUER = "ServerTouristCenter"; // èçäàòåëü òîêåíà
    public const string AUDIENCE = "ClientTouristCenter"; // ïîòðåáèòåëü òîêåíà
    const string KEY = "2292779d8d66ef1a6de3a02eb409efa9932d9cdb";   // êëþ÷ äëÿ øèôðîâàíèÿ
    public static readonly SigningCredentials SigningCredentials = new(GetSymmetricSecurityKey(), SecurityAlgorithms.HmacSha256);
    public static SymmetricSecurityKey GetSymmetricSecurityKey() => new(Encoding.UTF8.GetBytes(KEY));
}
