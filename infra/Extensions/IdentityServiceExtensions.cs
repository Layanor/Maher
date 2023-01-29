

namespace infra.Extensions
{
    public static class IdentityServiceExtensions
    {
        public static IServiceCollection AddIdentityServices(this IServiceCollection services, WebApplicationBuilder builder)
        {
            IWebHostEnvironment env = builder.Environment;
            IConfiguration _Configuration = builder.Configuration;
            var fileName = Path.Combine(env.ContentRootPath, "new.pfx");
            if (!File.Exists(fileName))
            {
                throw new FileNotFoundException("Signing Certificate is missing!");
            }
            var certificate = new X509Certificate2(System.IO.File.ReadAllBytes(fileName)
                                   , "zxcvbnm1A@"
                                  , X509KeyStorageFlags.MachineKeySet
                                     | X509KeyStorageFlags.Exportable
                                     );

            if (certificate == null)
            {
                throw new FileNotFoundException("certificate = null");
            }
            var d = Directory.GetCurrentDirectory();

            services.AddDefaultIdentity<ApplicationUser>(options =>
                     {
                     })
                        .AddRoles<ApplicationRole>()
                         .AddRoleManager<RoleManager<ApplicationRole>>()
                         .AddSignInManager<SignInManager<ApplicationUser>>()
                         .AddRoleValidator<RoleValidator<ApplicationRole>>()
                         .AddEntityFrameworkStores<ApplicationDbContextmariadb>()
                         .AddClaimsPrincipalFactory<AdditionalUserClaimsPrincipalFactory>();


            services.Configure<IdentityOptions>(options =>
                                    {
                                        options.Password.RequireDigit = true;
                                        options.Password.RequireLowercase = true;
                                        options.Password.RequireNonAlphanumeric = true;
                                        options.Password.RequireUppercase = true;
                                        options.Password.RequiredLength = 8;
                                        options.Password.RequiredUniqueChars = 1;
                                        options.Lockout.DefaultLockoutTimeSpan = TimeSpan.FromMinutes(5);
                                        options.Lockout.MaxFailedAccessAttempts = 5;
                                        options.Lockout.AllowedForNewUsers = true;
                                        options.User.AllowedUserNameCharacters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-._@+";

                                        options.SignIn.RequireConfirmedPhoneNumber = false;
                                        options.User.RequireUniqueEmail = true;
                                        options.SignIn.RequireConfirmedAccount = true;

                                        options.SignIn.RequireConfirmedEmail = false;


                                    });



            services.AddIdentityServer(options =>
                       {
                           var Devissure = _Configuration["sitedata:DevIssuer"];
                           var Proissure = _Configuration["sitedata:ProIssuer"];
                           if (env.IsDevelopment())
                           {
                               options.IssuerUri = Devissure;

                           }
                           else
                           {
                               options.IssuerUri = Proissure;
                           }
                           options.Events.RaiseErrorEvents = false;
                           options.Events.RaiseInformationEvents = false;
                           options.Events.RaiseFailureEvents = false;
                           options.Events.RaiseSuccessEvents = false;
                           options.UserInteraction = new UserInteractionOptions
                           {
                               // LoginUrl = "/login"
                           };


                       })

                         .AddSigningCredential(certificate)
                       .AddApiAuthorization<ApplicationUser, ApplicationDbContextmariadb>(options =>
                       {
                           options.SigningCredential = new SigningCredentials(new X509SecurityKey(certificate, "59E623B0368B1AF4762480E4BA682E282450835F"), "RS256");

                           options.IdentityResources["openid"].UserClaims.Add(JwtClaimTypes.Role);
                           options.IdentityResources["openid"].UserClaims.Add(JwtClaimTypes.Name);
                           options.IdentityResources["openid"].UserClaims.Add("usetype");
                           options.IdentityResources["openid"].UserClaims.Add("fullname");
                           options.IdentityResources["openid"].UserClaims.Add("usrschool");
                           options.IdentityResources["openid"].UserClaims.Add("usersdirs");
                           options.IdentityResources["openid"].UserClaims.Add(ClaimValueTypes.Email);

                           options.ApiResources.ToList().ForEach(x => x.UserClaims.Add(JwtClaimTypes.Role));
                           options.ApiResources.ToList().ForEach(x => x.UserClaims.Add(JwtClaimTypes.Name));
                           options.ApiResources.ToList().ForEach(x => x.UserClaims.Add("fullname"));
                           options.ApiResources.ToList().ForEach(x => x.UserClaims.Add("usetype"));
                           options.ApiResources.ToList().ForEach(x => x.UserClaims.Add("usrschool"));
                           options.ApiResources.ToList().ForEach(x => x.UserClaims.Add("usersdirs"));
                           options.ApiResources.ToList().ForEach(x => x.UserClaims.Add(ClaimValueTypes.Email));
                           options.Clients.AddIdentityServerSPA("school", spa =>
                           {
                               spa.WithRedirectUri("/authentication/login-callback")
                                  .WithLogoutRedirectUri("/authentication/logout-callback")
                                  .WithScopes("mainAPI", "openid", "profile");
                           });
                           foreach (var c in options.Clients)
                           {
                               c.AccessTokenType = AccessTokenType.Jwt;
                               c.AuthorizationCodeLifetime = 300;
                               c.IdentityTokenLifetime = 300;
                               c.AccessTokenLifetime = 3600;//1800; // Expiration in Seconds
                               c.UserSsoLifetime = 3600; //  1700;
                               c.AllowOfflineAccess = true;
                               c.PostLogoutRedirectUris.Add("/authentication/login");
                               c.SlidingRefreshTokenLifetime = 28000;
                               c.RefreshTokenUsage = TokenUsage.OneTimeOnly;
                               c.AbsoluteRefreshTokenLifetime = 28000;
                               c.UpdateAccessTokenClaimsOnRefresh = true;
                           }
                       });
            JwtSecurityTokenHandler.DefaultInboundClaimTypeMap.Remove("role");



            services.AddAuthentication(o =>
            {
                o.DefaultScheme = IdentityServerJwtConstants.IdentityServerJwtBearerScheme;
                o.DefaultAuthenticateScheme = IdentityServerJwtConstants.IdentityServerJwtBearerScheme;
                o.DefaultSignInScheme = IdentityConstants.ExternalScheme;
                o.DefaultChallengeScheme = IdentityServerJwtConstants.IdentityServerJwtBearerScheme;

            }
                )
                          .AddIdentityServerJwt();
            services.Configure<JwtBearerOptions>(IdentityServerJwtConstants.IdentityServerJwtBearerScheme, options =>
                   {
                       var Devissure = _Configuration["sitedata:DevIssuer"];
                       var Proissure = _Configuration["sitedata:ProIssuer"];
                       if (env.IsDevelopment())
                       {
                           options.Authority = Devissure;
                           options.RequireHttpsMetadata = false;
                       }
                       if (env.IsProduction())
                       {
                           options.Authority = Proissure;
                           options.RequireHttpsMetadata = true;
                       }
                       options.IncludeErrorDetails = true;
                       var singin = options.SecurityTokenValidators;
                       var onTokenValidated = options.Events.OnTokenValidated;
                       options.Events.OnTokenValidated = async context =>
                       {
                           var claimsIdentity = context.Principal.Identity as ClaimsIdentity;
                           if (claimsIdentity.Claims.Any() != true)
                               context.Fail("Token Has No Claim");
                           var securityStampsList = claimsIdentity.FindAll(new ClaimsIdentityOptions().SecurityStampClaimType).ToList();
                           if (securityStampsList == null)
                               context.Fail("Token Has No SecurityStamp");
                           await onTokenValidated(context);
                       };
                   });
            services.Configure<IdentityOptions>(options =>
                      {
                      });
            return services;
        }
    }
}
