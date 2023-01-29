


using Microsoft.EntityFrameworkCore.Diagnostics;

namespace infra.Extensions
{
    public static class ApplicationDbServicesExtensions

    {
        public static IServiceCollection AddApplicationDbServices(this IServiceCollection services, IConfiguration _Configuration)
        {
            var connectionStringmariadb = _Configuration.GetConnectionString("DefaultConnectionmariadb");
            var serverVersion = new MySqlServerVersion(new Version(10, 6, 11));
            services.AddDbContext<ApplicationDbContextmariadb>(
                options =>
                {
                    options.UseMySql(connectionStringmariadb, serverVersion, b =>
                {
                    b.MigrationsAssembly("infra");
                    b.UseQuerySplittingBehavior(QuerySplittingBehavior.SingleQuery);
                }).UseQueryTrackingBehavior(QueryTrackingBehavior.NoTracking).LogTo(Console.WriteLine, LogLevel.Warning);
                    // .EnableSensitiveDataLogging()
                    // .EnableDetailedErrors();
                    options.ConfigureWarnings(warningsAction =>
                {
                    warningsAction.Ignore(CoreEventId.RowLimitingOperationWithoutOrderByWarning);
                });
                }
                    );

            return services;
        }


    }


}
