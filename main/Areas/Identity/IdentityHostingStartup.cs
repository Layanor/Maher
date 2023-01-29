[assembly: HostingStartup(typeof(main.Areas.Identity.IdentityHostingStartup))]
namespace main.Areas.Identity
{
    public class IdentityHostingStartup : IHostingStartup
    {
        public void Configure(IWebHostBuilder builder)
        {
            builder.ConfigureServices((context, services) =>
            {
            });
        }
    }
}
