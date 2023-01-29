
namespace infra.Extensions
{
    public static class ApplicationsitedataServicesExtensions
    {
        public static IServiceCollection AddApplicationsitedataServices(this IServiceCollection services, IConfiguration _Configuration)
        {
            var sitedata = _Configuration.GetSection("sitedata");
            services.Configure<SiteData>(sitedata);
            //smtpemail
            var MailSettings = _Configuration.GetSection("SmtpMailSettings");
            services.Configure<SmtpMailSettings>(MailSettings);
            services.AddTransient<IMailService, MailService>();
            //apiemail
            var apiMailSettings = _Configuration.GetSection("ApiMailSettings");
            services.Configure<ApiMailSettings>(apiMailSettings);
            services.AddTransient<ApiImailService, ApimailService>();

            return services;
        }

    }
}
