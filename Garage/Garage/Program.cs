using Garage.Data;
using Garage.Models;
var builder = WebApplication.CreateBuilder(args);



// Add services to the container.



builder.Services.AddSingleton<IGarageContext, GarageContext>();
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseAuthorization();
app.UseCors(p => p.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod());
app.MapControllers();
SeedData();
app.Run();


void SeedData()
{
    using (var scope = app.Services.CreateScope())
    {
        var _context = scope.ServiceProvider.GetRequiredService<IGarageContext>();

        _context.Cars = Task.FromResult(new List<Car>());
        _context.ContactPersons = Task.FromResult(new List<ContactPerson>());
        _context.CarsAtService = Task.FromResult(new List<CarAtService>());
        _context.CarServiceHistory = Task.FromResult(new List<CarServiceHistory>());

        _context.ContactPersons.Result.AddRange(new List<ContactPerson>() {
                new ContactPerson { Id=1, Name = "John", Surname = "Denver", Phone="4423442" },
                 new ContactPerson { Id=2, Name = "Jack", Surname =  "Floppy", Phone="874365"},
                 new ContactPerson { Id=3 ,Name = "Bob", Surname = "Saget", Phone="197747" },
                 new ContactPerson { Id=4, Name = "Stipe", Surname = "The Rock", Phone="48857874" }});

        _context.Cars.Result.AddRange(new List<Car>() {
                new Car { Id=1, LicensePlate = "RI-123EN", BrandModelYear = "Ford Fiesta 2002", VehicleIdNumber = "4845151515" },
                new Car { Id=2,  LicensePlate = "ZG-456FE", BrandModelYear = "Fiat 127 1989", VehicleIdNumber = "785212466" },
                new Car { Id=3, LicensePlate = "OS-415ER", BrandModelYear = "Volkswagen Golf 5 2004", VehicleIdNumber = "8753214455" }});

        _context.CarsAtService.Result.AddRange(new List<CarAtService>()
            {
                new CarAtService
                {
                    Id = 1,
                    Car = _context.Cars.Result[0],
                    ContactPerson = _context.ContactPersons.Result[0],
                    EstimatedComplexity = WorkComplexityEnum.Simple,
                    EstimatedDurationInHours = 1,
                    WorkNeedToBeDone = "check why the car wont start",
                    DateOfArrival = DateTime.Now.AddDays(-10)
                },
                new CarAtService
                {
                    Id = 2,
                    Car = _context.Cars.Result[1],
                    ContactPerson =_context.ContactPersons.Result[1],
                    EstimatedComplexity = WorkComplexityEnum.Intermediate,
                    EstimatedDurationInHours = 1,
                    WorkNeedToBeDone = "change breaks",
                    DateOfArrival = DateTime.Now.AddDays(-9)
                },
                new CarAtService
                {
                    Id= 3,
                    Car = _context.Cars.Result[2],
                    ContactPerson = _context.ContactPersons.Result[2],
                    EstimatedComplexity = WorkComplexityEnum.High,
                    EstimatedDurationInHours = 3,
                    WorkNeedToBeDone = "check what is wrong with the car computer",
                    DateOfArrival = DateTime.Now.AddDays(-8)
                }
    });


        _context.CarServiceHistory.Result.AddRange(new List<CarServiceHistory>()
            {
                new CarServiceHistory
                {
                    Id = 1,
                    Car = _context.Cars.Result[0],
                    CarStatus = CarStatusEnum.StartWorkingOnCar,
                    DateOfStatusChange = DateTime.Now.AddDays(-9)
                },
                new CarServiceHistory
                {
                    Id = 2,
                    Car = _context.Cars.Result[0],
                    CarStatus = CarStatusEnum.WaitingForPart,
                    DateOfStatusChange = DateTime.Now.AddDays(-9),
                    Note = "We ordered new fuel pump."
                },
                new CarServiceHistory
                {
                    Id = 3,
                    Car = _context.Cars.Result[0],
                    CarStatus = CarStatusEnum.WorkIsDone,
                    DateOfStatusChange = DateTime.Now.AddDays(-5)
                },
                new CarServiceHistory
                {
                    Id = 4,
                    Car = _context.Cars.Result[0],
                    CarStatus = CarStatusEnum.ReadyForPickUp,
                    DateOfStatusChange = DateTime.Now.AddDays(-5),
                    Note = "Client need to pay 150$."
                },
                new CarServiceHistory
                {
                    Id = 5,
                    Car = _context.Cars.Result[0],
                    CarStatus = CarStatusEnum.CarCheckedIn,
                    DateOfStatusChange = DateTime.Now.AddDays(-10),
                },
                new CarServiceHistory
                {
                    Id = 6,
                    Car = _context.Cars.Result[1],
                    CarStatus = CarStatusEnum.CarCheckedIn,
                    DateOfStatusChange = DateTime.Now.AddDays(-11),
                },
                new CarServiceHistory
                {
                    Id = 7,
                    Car = _context.Cars.Result[2],
                    CarStatus = CarStatusEnum.CarCheckedIn,
                    DateOfStatusChange = DateTime.Now.AddDays(-10),
                }
            });
    }
}
