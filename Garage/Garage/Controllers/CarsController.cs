using Garage.Data;
using Garage.Models;
using Microsoft.AspNetCore.Mvc;

namespace Garage.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CarsController : ControllerBase
    {
        private readonly IGarageContext _context;

        public CarsController(IGarageContext context)
        {
            _context = context;
        }

        // GET: api/Cars
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Car>>> GetCar()
        {
            if (_context.Cars != null)
                return Ok(await _context.Cars);

            return NotFound();
        }

        // GET: api/Cars/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Car>> GetCar(int id)
        {
            var car = _context.Cars.Result.FirstOrDefault(c => c.Id == id);

            if (car == null)
            {
                return NotFound();
            }

            return car;
        }

        // PUT: api/Cars/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCar(int id, Car carToUpdate)
        {
            var car = _context.Cars.Result.FirstOrDefault(c => c.Id == id);

            _context.Cars.Result.Remove(car);
            _context.Cars.Result.Add(carToUpdate);

            return NoContent();
        }

        // POST: api/Cars
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Car>> PostCar(Car car)
        {
            int lastCarId = _context.Cars.Result.OrderByDescending(c => c.Id).First().Id;

            car.Id = ++lastCarId;

            _context.Cars.Result.Add(car);
            return car;
        }

        // DELETE: api/Cars/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCar(int id)
        {

            var car = _context.Cars.Result.FirstOrDefault(c => c.Id == id);

            _context.Cars.Result.Remove(car);

            return NoContent();
        }

    }
}
