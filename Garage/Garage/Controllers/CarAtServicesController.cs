using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Garage.Data;
using Garage.Models;

namespace Garage.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CarAtServicesController : ControllerBase
    {
        private readonly IGarageContext _context;

        public CarAtServicesController(IGarageContext context)
        {
            _context = context;
        }

        // GET: api/CarAtServices
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CarAtService>>> GetCarAtService()
        {
            if (_context.CarsAtService != null)
                return Ok(await _context.CarsAtService);

            return NotFound();
        }

        // GET: api/CarAtServices/5
        [HttpGet("{id}")]
        public async Task<ActionResult<CarAtService>> GetCarAtService(int id)
        {
            var carAtService = _context.CarsAtService.Result.FirstOrDefault(cas => cas.Id == id);

            if (carAtService == null)
            {
                return NotFound();
            }

            return carAtService;
        }

        // PUT: api/CarAtServices/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCarAtService(int id, CarAtService carAtServiceUpdated)
        {
            var carAtService = _context.CarsAtService.Result.FirstOrDefault(cas => cas.Id == id);

            _context.CarsAtService.Result.Remove(carAtService);
            _context.CarsAtService.Result.Add(carAtServiceUpdated);

            return NoContent();
        }
        
        // POST: api/CarAtServices
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<CarAtService>> PostCarAtService(CarAtService carAtService)
        {

            _context.CarsAtService.Result.Add(carAtService);
            return NoContent();
        }

        // DELETE: api/CarAtServices/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCarAtService(int id)
        {
            var carAtService =  _context.CarsAtService.Result.FirstOrDefault(cas=>cas.Id == id);

            _context.CarsAtService.Result.Remove(carAtService);

            return NoContent();
        }

    }
}
