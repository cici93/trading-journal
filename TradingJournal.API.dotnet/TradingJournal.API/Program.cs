using System.Text.Json.Serialization;
using Microsoft.EntityFrameworkCore;
using TradingJournal.Data;
using TradingJournal.Interfaces;
using TradingJournal.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers().AddJsonOptions(options =>
{
     options.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter());
});


//Add db service
// var connectionString = builder.Configuration.GetConnectionString("Postgres");
// builder.Services.AddDbContext<DataContext>(options => 
//     options.UseNpgsql(connectionString)
// );

//Add Cors
builder.Services.AddCors(options =>
{
    options.AddPolicy("Wildcard",
        builder => builder
            .AllowAnyOrigin()
            .AllowAnyMethod()
            .AllowAnyHeader());
});

// Swagger
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

//Custom services
// builder.Services.AddScoped<ITransactionService, TransactionService>();
// builder.Services.AddScoped<IPositionService, PositionService>();
builder.Services.AddScoped<IDataService, DataService>();
builder.Services.AddHttpClient();

//Lazy services
// builder.Services.AddScoped(provider => new Lazy<ITransactionService>(
//     provider.GetRequiredService<ITransactionService>));
//
// builder.Services.AddScoped(provider => new Lazy<IPositionService>(
//     provider.GetRequiredService<IPositionService>));


var app = builder.Build();


// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("Wildcard");
app.UseHttpsRedirection();
app.MapControllers();

app.Run();
