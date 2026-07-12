using FluentValidation;
using Libres.API.Common;
using Libres.API.Features;
using Libres.API.Features.Users.Domain;
using Libres.API.Shared;
 using Libres.API.Shared.Application.Mediator;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.DependencyInjection.Extensions;
using Microsoft.Extensions.FileProviders;
using Scalar.AspNetCore;



var builder = WebApplication.CreateBuilder(args);
builder.Services.AddHttpContextAccessor();
builder.Services.AddApiServices();
builder.Services.Configure<StorageOptions>(builder.Configuration.GetSection("Storage"));

builder.Services.AddSharedInfrastructureServices(builder.Configuration);
builder.Services.AddCookiesAuthentication();
builder.Services.AddSharedApplicationServices(typeof(FeaturesAssemblyMarker).Assembly);
builder.Services.AddValidatorsFromAssemblyContaining<FeaturesAssemblyMarker>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.MapScalarApiReference();
    app.UseCors("LocalhostPolicy");
}


app.UseHttpsRedirection();

app.UseRouting();
app.UseCors("GlobalPolicy");

app.UseAuthentication();
app.UseAuthorization();

var uploadsPath = Path.Combine(builder.Environment.ContentRootPath, "uploads", "public_files");
if (!Directory.Exists(uploadsPath))
{
    Directory.CreateDirectory(uploadsPath);
}

app.UseStaticFiles(new StaticFileOptions
{
    FileProvider = new PhysicalFileProvider(uploadsPath),
    RequestPath = "/uploads/public_files",
});
app.MapControllers();

app.Run();


