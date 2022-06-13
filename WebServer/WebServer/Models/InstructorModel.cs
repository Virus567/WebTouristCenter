using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WebServer.Models;

public class InstructorModel
{
    public int ID { get; set; }
    public string Surname { get; set; }
    public string Name { get; set; }
    public string? Middlename { get; set; }
    public string Image { get; set; }
    public string Discription { get; set; }

    public InstructorModel(int id, string surname, string name, string? middlename, string image, string discription)
    {
        ID = id;
        Surname = surname;
        Name = name;
        Middlename = middlename;
        Image = image;
        Discription = discription;
    }
}
