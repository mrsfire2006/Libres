using Libres.API.Common;
using Libres.API.Features;
using Libres.API.Shared;
using Microsoft.Extensions.FileProviders;
using Scalar.AspNetCore;





var builder = WebApplication.CreateBuilder(args);

builder.Services.AddApiServices();


builder.Services.AddSharedInfrastructureServices(builder.Configuration);
builder.Services.AddCookiesAuthentication();
builder.Services.AddSharedApplicationServices(typeof(FeaturesAssemblyMarker).Assembly);
// builder.Services.AddControllers()
//     .AddJsonOptions(options =>
//     {
//         options.JsonSerializerOptions.TypeInfoResolver = AppJsonSerializerContext.Default;
//     });


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.MapScalarApiReference();
}


app.UseHttpsRedirection();
app.UseCors("LocalhostPolicy");

app.UseAuthentication();
app.UseAuthorization();

var uploadsPath = Path.Combine(builder.Environment.ContentRootPath, "uploads");
Directory.CreateDirectory(uploadsPath);

app.UseStaticFiles(new StaticFileOptions
{
    FileProvider = new PhysicalFileProvider(uploadsPath),
    RequestPath = "/uploads"
});
app.MapControllers();

app.Run();

