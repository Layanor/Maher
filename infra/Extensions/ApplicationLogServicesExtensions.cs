

namespace infra.Extensions
{
    public static class ApplicationLogServicesExtensions
    {
        public static IServiceCollection AddApplicationLogServices(this IServiceCollection services,
         WebApplicationBuilder builder)
        {
            IConfiguration _Configuration = builder.Configuration;
            builder.Logging.ClearProviders();
            if (builder.Environment.IsDevelopment())
            {
                var levelSwitch = new LoggingLevelSwitch();
                var MinimumlogLevel = Serilog.Events.LogEventLevel.Information;
                levelSwitch.MinimumLevel = MinimumlogLevel;
                Log.Logger = new LoggerConfiguration()
            .MinimumLevel.ControlledBy(levelSwitch)
            .MinimumLevel.Override("Microsoft.EntityFrameworkCore.Database.Command", Serilog.Events.LogEventLevel.Information)

                .WriteTo.Console(
                    theme: AnsiConsoleTheme.Code,
                    outputTemplate: "[{Timestamp:HH:mm:ss} {Level:u3}] {Message:lj}{NewLine}{Exception}")
                  .WriteTo.MariaDB(connectionString: _Configuration.GetConnectionString("DefaultConnectionmariadb"),
                                        tableName: "LogEvents",
                                        autoCreateTable: true,
                                        useBulkInsert: false,
                                        restrictedToMinimumLevel: Serilog.Events.LogEventLevel.Warning,
                                        options: new MariaDBSinkOptions())
                .CreateLogger();
                Serilog.Debugging.SelfLog.Enable(Console.Error);
                //builder.Logging.AddSerilog(Log.Logger);
                builder.Services.AddSingleton(Log.Logger);
                builder.Host.UseSerilog();

                Log.Debug("Hello, world!");

            }
            else
            {
                var logdir = new DirectoryInfo(Directory.GetCurrentDirectory() + "/Logs");
                DateTime d = DateTime.Now;
             
                Log.Logger = new LoggerConfiguration()
                 .ReadFrom.Configuration(_Configuration)
                    .Enrich.FromLogContext()
                 .WriteTo.File(logdir + $"/JsonLogggg-{d.Day}-{d.Month}-{d.Year}.json", outputTemplate: "{Timestamp:yyyy-MM-dd HH:mm:ss.fff zzz} [{Level}] [{SourceContext}] [{EventId}] {Message}{NewLine}{Exception}")

                     .WriteTo.MariaDB(connectionString: _Configuration.GetConnectionString("DefaultConnectionmariadb"),
                                        tableName: "LogEvents",
                                        autoCreateTable: true,
                                        useBulkInsert: false,
                                        restrictedToMinimumLevel: Serilog.Events.LogEventLevel.Warning,
                                        options: new MariaDBSinkOptions())
                  
                .CreateLogger();
                builder.Services.AddSingleton(Log.Logger);
                builder.Host.UseSerilog();
                Log.Warning("Starting the Service Debug");
                Serilog.Debugging.SelfLog.Enable(Console.Error);
            }





            return services;
        }

    }
}
