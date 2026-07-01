using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;
using Libres.API.Common;
using Libres.API.Data.Persistence;
using Libres.API.Features.Users.Domain;
using Libres.API.Shared.Application.Factories;
using Libres.API.Shared.Application.Mediator;
using Microsoft.AspNetCore.DataProtection;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace Libres.API.Shared
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddSharedApplicationServices(this IServiceCollection services)
        {

            services.AddScoped<CustomMediator>();
            var assembly = Assembly.GetExecutingAssembly();

            var handlerRegistrations = assembly.GetTypes()
                .Where(t => !t.IsAbstract && !t.IsInterface)
                .SelectMany(t => t.GetInterfaces()
                    .Where(i => i.IsGenericType && i.GetGenericTypeDefinition() == typeof(ICustomRequestHandler<,>))
                    .Select(i => new { Service = i, Implementation = t }));


            foreach (var registration in handlerRegistrations)
            {
                services.AddTransient(registration.Service, registration.Implementation);
            }

            return services;
        }
        public static IServiceCollection AddSharedInfrastructureServices(this IServiceCollection services, IConfiguration configuration)
        {

            services.AddDbContext<AppDbContext>(options =>
                {
                    options.UseNpgsql(configuration.GetConnectionString("LibresDB"));
                });
            services.AddDataProtection()
            .PersistKeysToDbContext<AppDbContext>()
            .SetApplicationName("YourUniqueAppName");


            return services;
        }
        public static IServiceCollection AddApiServices(this IServiceCollection services)
        {

            services.AddOpenApi();
            services.AddControllers();
            services.AddControllers(options =>
{
    options.Conventions.Add(new ApiRouteConvention());
});

            services.AddCors(options =>
             {
                 options.AddPolicy("NextAppPolicy", policy =>
                 {
                     policy.WithOrigins("http://localhost:5173")
                           .AllowAnyHeader()
                           .AllowAnyMethod()
                           .AllowCredentials();
                 });
                 options.AddPolicy("LocalhostPolicy", policy =>
                 {
                     policy.SetIsOriginAllowed(origin => new Uri(origin).Host == "localhost")
                                   .AllowAnyHeader()
                                   .AllowAnyMethod()
                                   .AllowCredentials();
                 });
             });


            return services;
        }
        public static IServiceCollection AddCookiesAuthentication(this IServiceCollection services)
        {
            services.AddIdentityCore<User>(options =>
        {
            options.Password.RequiredLength = 3;

            options.Password.RequireDigit = false;
            options.Password.RequireLowercase = false;
            options.Password.RequireUppercase = false;
            options.Password.RequireNonAlphanumeric = false;
            options.Password.RequiredUniqueChars = 0;
        })
                    .AddClaimsPrincipalFactory<CustomClaimsPrincipalFactory>()
                    .AddSignInManager()
                    .AddEntityFrameworkStores<AppDbContext>();

            services.AddAuthentication(options =>
                        {
                            options.DefaultAuthenticateScheme = IdentityConstants.ApplicationScheme;
                            options.DefaultChallengeScheme = IdentityConstants.ApplicationScheme;
                            options.DefaultSignOutScheme = IdentityConstants.ApplicationScheme;
                        })
                        .AddCookie(IdentityConstants.ApplicationScheme, options =>
                        {
                            options.Cookie.Name = "YourApiCookie";
                            options.SlidingExpiration = true;

                            options.ExpireTimeSpan = TimeSpan.FromMinutes(30);
                            options.Cookie.HttpOnly = true;

                            options.Cookie.SameSite = SameSiteMode.Lax;

                            options.Events.OnRedirectToLogin = context =>
                            {
                                context.Response.StatusCode = StatusCodes.Status401Unauthorized;
                                return Task.CompletedTask;
                            };

                            options.Events.OnRedirectToAccessDenied = context =>
                            {
                                context.Response.StatusCode = StatusCodes.Status403Forbidden;
                                return Task.CompletedTask;
                            };
                        });
            services.AddDataProtection()
                            .PersistKeysToDbContext<AppDbContext>()
                            .SetApplicationName("YourUniqueAppName");



            return services;
        }

    }
}