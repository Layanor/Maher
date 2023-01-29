

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddApplicationLogServices(builder);
builder.Services.AddApplicationsitedataServices(builder.Configuration);
builder.Services.AddApplicationDbServices(builder.Configuration);
builder.Services.AddApplicationServices();
builder.Services.AddIdentityServices(builder);

var app = builder.Build();
 app.SeedDataBase();
app.AppConfiguration(builder);

app.Run();



