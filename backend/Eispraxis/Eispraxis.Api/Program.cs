using Eispraxis.Api.Data;
using Eispraxis.Api.Services;
using Microsoft.EntityFrameworkCore;
using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp", policy =>
    {
        policy
            .WithOrigins("http://localhost:5173")
            .AllowAnyHeader()
            .AllowAnyMethod()
            .AllowCredentials();
    });
});

builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(
        builder.Configuration.GetConnectionString("DefaultConnection")));

// Add services to the container.
builder.Services
    .AddIdentityApiEndpoints<IdentityUser>()
    .AddEntityFrameworkStores<ApplicationDbContext>();

builder.Services.AddAuthorization();
builder.Services.AddScoped<CustomerService>();
builder.Services.AddScoped<DashboardService>();

builder.Services
    .AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.NumberHandling =
            JsonNumberHandling.Strict;
    });// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();

    app.UseSwaggerUI(options =>
    {
        options.SwaggerEndpoint("/openapi/v1.json", "Eispraxis API");
    });
}

app.UseHttpsRedirection();

app.UseCors("AllowReactApp");

// Block public registration, staff accounts will be created separately
app.Use(async (context, next) =>
{
    if (context.Request.Path.StartsWithSegments(
        "/api/auth/register",
        StringComparison.OrdinalIgnoreCase))
    {
        context.Response.StatusCode = StatusCodes.Status404NotFound;
        return;
    }

    await next();
});

app.UseAuthentication();
app.UseAuthorization();

app.MapGroup("/api/auth")
    .MapIdentityApi<IdentityUser>();

app.MapControllers();

app.MapPost("/api/auth/logout", async (
    SignInManager<IdentityUser> signInManager,
    [FromBody] object body) =>
{
    if (body == null)
    {
        return Results.BadRequest();
    }

    await signInManager.SignOutAsync();

    return Results.NoContent();
})
.RequireAuthorization();

app.Run();