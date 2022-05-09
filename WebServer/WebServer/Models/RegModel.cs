namespace WebServer.Models;

public class RegModel
{
    public string login { get; set; }
    public string password { get; set; }
    public string surname { get; set; }
    public string name { get; set; }
    public string middlename { get; set; }
    public string phone { get; set; }
    public string email { get; set; }
    public string nameOfCompany { get; set; }

    public static bool Check(RegModel? model)
    {
        return model is not null && string.IsNullOrEmpty(model.login) && string.IsNullOrEmpty(model.password) &&
               string.IsNullOrEmpty(model.surname) && string.IsNullOrEmpty(model.name) &&
               string.IsNullOrEmpty(model.phone);
    }
}
