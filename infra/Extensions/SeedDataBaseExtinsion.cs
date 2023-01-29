

namespace infra.Extensions
{
    public static class SeedDataBaseExtinsion
    {
        public static IApplicationBuilder SeedDataBase(this IApplicationBuilder app)
        {
            using (var scope = app.ApplicationServices.CreateScope())
            {
                var services = scope.ServiceProvider;
                //  var context =services.GetService<ApplicationDbContext>();
               var logger = services.GetRequiredService<Serilog.ILogger>();
                try
                {
                  //  logger.LogInformation("add migration to  database");
                  //  var context = services.GetRequiredService<ApplicationDbContextmariadb>();
                  //  context.Database.MigrateAsync();
                  //  logger.LogInformation("Seeding API database");
                    var dbInitialiser = services.GetRequiredService<ISeedData>();
                    dbInitialiser.InitialiseAsync();
                    // var userManager = services.GetRequiredService<UserManager<ApplicationUser>>();
                    // var roleManager = services.GetRequiredService<RoleManager<ApplicationRole>>();

                    // await domain.Data.SeddUseraAndClime.SeedBasicUserAsync(userManager);
                    // await domain.Data.SeddUseraAndClime.SeedSuperAdminUserAsync(userManager, roleManager);

                  //  logger.LogInformation("Data seeded");
                 //   logger.LogInformation("Application Started");

                }
                catch (Exception ex)
                {
                    logger.Error("Error creating/seeding API database - " + ex);
                }
            }
            return app;
        }

    }
}