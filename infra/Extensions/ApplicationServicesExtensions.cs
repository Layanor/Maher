

namespace infra.Extensions
{
    public static class ApplicationServicesExtensions
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services)
        {

            IdentityModelEventSource.ShowPII = true;

            services.AddTransient<ISeedData, SeedDbData>();
            services.AddScoped(typeof(IDataRepo<>), (typeof(DataRepo<>)));
            services.AddScoped<IUnitOfWork, UnitOfWork>();
            services.AddDistributedMemoryCache();
            services.AddSession(options =>
            {
                options.IdleTimeout = TimeSpan.FromMinutes(120);
            });
            services.AddResponseCompression(options =>
         {
             options.Providers.Add<GzipCompressionProvider>();
             options.Providers.Add<BrotliCompressionProvider>();
             options.EnableForHttps = true;
         });
            services.Configure<GzipCompressionProviderOptions>(options =>
            {
                options.Level = CompressionLevel.SmallestSize;
            });
            services.Configure<BrotliCompressionProviderOptions>(options =>
            {
                options.Level = CompressionLevel.SmallestSize;
            });
       
            var mapperConfig = new MapperConfiguration(mc => { mc.AddProfile(new AutoMapperProfile()); });
            IMapper mapper = mapperConfig.CreateMapper();
            services.AddSingleton(mapper);
            services.AddRequestDecompression();
            services.Configure<HstsOptions>(options =>
    {
        options.IncludeSubDomains = true;
        options.MaxAge = TimeSpan.FromDays(120);
        options.Preload = true;
    });

            services.AddRazorPages();
            services.Configure<ForwardedHeadersOptions>(options =>
            {
                options.ForwardedHeaders =
                    ForwardedHeaders.XForwardedFor | ForwardedHeaders.XForwardedProto;
            });

            services.AddControllersWithViews(
             options =>
             {
                 options.ModelMetadataDetailsProviders.Add(new SystemTextJsonValidationMetadataProvider());
                 var policy = new AuthorizationPolicyBuilder()
                   .RequireAuthenticatedUser()
                   .Build();
                 options.Filters.Add(new AuthorizeFilter(policy));

             }


          ).ConfigureApiBehaviorOptions(options =>
          {
            options.SuppressConsumesConstraintForFormFileParameters = true;
              options.SuppressInferBindingSourcesForParameters = true;
              options.SuppressModelStateInvalidFilter = true;
            
          })
          .AddNewtonsoftJson(options =>
          {
            options.SerializerSettings.ContractResolver = null;
           
          });
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "wwwroot";
            });
            return services;
        }
    }
}
