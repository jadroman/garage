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
    public class CarStatusController : ControllerBase
    {
        private readonly GarageContext _context;

        public CarStatusController(GarageContext context)
        {
            _context = context;
        }

        // GET: api/CarStatus
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CarStatus>>> GetCarStatus()
        {
            if (_context.CarStatuses != null)
                return Ok(await _context.CarStatuses);

            return NotFound();
        }

        // GET: api/CarStatus/5
        [HttpGet("{id}")]
        public async Task<ActionResult<CarStatus>> GetCarStatus(int id)
        {
            var carStatus = _context.CarStatuses.Result.FirstOrDefault(cas => cas.Id == id);

            if (carStatus == null)
            {
                return NotFound();
            }

            return carStatus;
        }

        // PUT: api/CarStatus/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCarStatus(int id, CarStatus carStatusUpdate)
        {
            var carStatus = _context.CarStatuses.Result.FirstOrDefault(cas => cas.Id == id);

            _context.CarStatuses.Result.Remove(carStatus);
            _context.CarStatuses.Result.Add(carStatusUpdate);

            return NoContent();
        }

        // POST: api/CarStatus
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<CarStatus>> PostCarStatus(CarStatus carStatus)
        {
            _context.CarStatuses.Result.Add(carStatus);
            return NoContent();
        }

        // DELETE: api/CarStatus/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCarStatus(int id)
        {
            var carStatus = _context.CarStatuses.Result.FirstOrDefault(cas => cas.Id == id);

            _context.CarStatuses.Result.Remove(carStatus);

            return NoContent();
        }

    }
}
