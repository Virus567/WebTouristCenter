﻿using Microsoft.EntityFrameworkCore;
using System.IO;
using TouristСenterLibrary.Entity;

namespace TouristСenterLibrary
{
    public class ApplicationContext : DbContext
    {
        public DbSet<Order> Order { get; set; }
        public DbSet<ApplicationType> ApplicationType { get; set; }
        public DbSet<CheckpointRoute> CheckpointRoute { get; set; }
        public DbSet<TouristGroup> TouristGroup { get; set; }
        public DbSet<User> User { get; set; }
        public DbSet<CountableEquipment> CountableEquipment { get; set; }
        public DbSet<CountableHikeEquipment> CountableHikeEquipment { get; set; }
        public DbSet<Employee> Employee { get; set; }
        public DbSet<Equipment> Equipment { get; set; }
        public DbSet<Hike> Hike { get; set; }
        public DbSet<Instructor> Instructor { get; set; }
        public DbSet<InstructorGroup> InstructorGroup { get; set; }
        public DbSet<Participant> Participant { get; set; }
        public DbSet<Role> Role { get; set; }
        public DbSet<Route> Route { get; set; }
        public DbSet<RouteHike> RouteHike { get; set; }
        public DbSet<Transport> Transport { get; set; }
        public DbSet<Team> Team { get; set; }
        public DbSet<Teammate> Teammate { get; set; }
        public DbSet<TransportCompany> TransportCompany { get; set; }


        public ApplicationContext(DbContextOptions<ApplicationContext> options):base(options)
        {
            Database.Migrate();
        }

        readonly static StreamWriter stream = new StreamWriter("log.txt", true);
        
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Ignore<Human>();
            modelBuilder.Entity<Role>(EntityConfigure.RoleConfigure);
            modelBuilder.Entity<ApplicationType>(EntityConfigure.ApplicationTypeConfigure);
            modelBuilder.Entity<CheckpointRoute>(EntityConfigure.CheckpointRouteConfigure);
            modelBuilder.Entity<Route>(EntityConfigure.RouteConfigure);
            modelBuilder.Entity<Employee>(EntityConfigure.EmployeeConfigure);
            modelBuilder.Entity<User>(EntityConfigure.UserConfigure);
            modelBuilder.Entity<Team>().HasMany(x => x.Teammates).WithOne(x=>x.Team);
            modelBuilder.Entity<TransportCompany>(EntityConfigure.TransportCompanyConfigure);
            modelBuilder.Entity<Transport>(EntityConfigure.TransportConfigure);
            modelBuilder.Entity<Instructor>(EntityConfigure.InstructorConfigure);
            modelBuilder.Entity<Equipment>(EntityConfigure.EquipmentConfigure);
            modelBuilder.Entity<CountableEquipment>(EntityConfigure.CountableEquipmentConfigure);
        }
        
    }

}
