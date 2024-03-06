using Garage.Data;
using Garage.Models;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Garage.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SeedController : ControllerBase
    {
        private readonly IGarageContext _context;

        public SeedController(IGarageContext context)
        {
            _context = context;
        }

        // GET: api/<SeedController>
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/<SeedController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<SeedController>
        [HttpPost]
        public async void Post()
        {

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
                new Car { Id=3, LicensePlate = "OS-415ER", BrandModelYear = "volkswagen 5 2004", VehicleIdNumber = "8753214455" }});

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

        // PUT api/<SeedController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<SeedController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
