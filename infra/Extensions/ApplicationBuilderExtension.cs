


namespace infra.Extensions
{
    public static class ApplicationBuilderExtension
    {
        public static IApplicationBuilder AppConfiguration(this IApplicationBuilder app,
         WebApplicationBuilder builder)
        {
            IWebHostEnvironment env = builder.Environment;
            Syncfusion.Licensing.SyncfusionLicenseProvider.RegisterLicense("ORg4AjUWIQA/Gnt2VVhkQlFadVdJXGFWfVJpTGpQdk5xdV9DaVZUTWY/P1ZhSXxRd0dhXH5ddXBUR2dbVUM=;Mgo+DSMBMAY9C3t2VVhkQlFadVdJXGFWfVJpTGpQdk5xdV9DaVZUTWY/P1ZhSXxRd0dhXH5ddXBUR2dVUUM=");
            app.UseMiddleware<CustomErrorMiddleWare>();
            app.UseRequestDecompression();
            app.UseForwardedHeaders();
            if (env.IsDevelopment())
            {
                app.UseMigrationsEndPoint();
            }
            else
            {
                app.UseResponseCompression();
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }
            app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseRouting();
            app.UseAuthentication();
            app.UseIdentityServer();
            app.UseAuthorization();
            app.UseSession();

            // app.MapControllerRoute(
            //     name: "default",
            //     pattern: "{controller}/{action=Index}/{id?}");
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller}/{action=Index}/{id?}");
                endpoints.MapRazorPages();
                if (!env.IsDevelopment())
                {
                    endpoints.MapFallbackToFile("index.html");
                }

            });
            app.UseSpa(spa =>
            {
                spa.Options.SourcePath = "wwwroot/";
                if (env.IsDevelopment())
                {
                    spa.UseProxyToSpaDevelopmentServer("http://localhost:4200");
                }
            });

            return app;
        }

    }
}