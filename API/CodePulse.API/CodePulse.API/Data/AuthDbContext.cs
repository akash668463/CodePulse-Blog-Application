using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;

namespace CodePulse.API.Data
{
    public class AuthDbContext : IdentityDbContext
    {
        public AuthDbContext(DbContextOptions<AuthDbContext> options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            var readerRoleId = "b74ddd14-6340-4840-95c2-db12554843e5";
            var writerRoleId = "c74ddd14-6340-4840-95c2-db12554843e6";

            //Create two roles - Reader and Writer
            var roles = new List<IdentityRole>
            {
                new IdentityRole()
                {
                    Id = readerRoleId,
                    Name = "Reader",
                    NormalizedName = "Reader".ToUpper(),
                    ConcurrencyStamp = readerRoleId
                },
                new IdentityRole()
                {
                    Id = writerRoleId,
                    Name = "Writer",
                   NormalizedName = "Writer".ToUpper(),
                   ConcurrencyStamp = writerRoleId
                }
            };

            //Seed the roles
            builder.Entity<IdentityRole>().HasData(roles);

            //Create an admin user
            var adminUserId = "a74ddd14-6340-4840-95c2-db12554843e7";
            var admin = new IdentityUser
            {
                Id = adminUserId,
                UserName = "admin@codepulse.com",
                Email = "admin@codepulse.com",
                NormalizedEmail = "admin@codepulse.com".ToUpper(),
                NormalizedUserName = "admin@codepulse.com".ToUpper()
            };
            //Set user password
            var passwordHasher = new PasswordHasher<IdentityUser>();
            admin.PasswordHash = passwordHasher.HashPassword(admin, "Admin@123");
            builder.Entity<IdentityUser>().HasData(admin);

            //Assign admin user to Writer role
            var adminRoles = new List<IdentityUserRole<string>>()
            {
                new()
                {
                    UserId = adminUserId,
                    RoleId = writerRoleId,
                },
                new()
                {
                    UserId = adminUserId,
                    RoleId = readerRoleId,
                }
            };
            builder.Entity<IdentityUserRole<string>>().HasData(adminRoles);
        }
    }
}
