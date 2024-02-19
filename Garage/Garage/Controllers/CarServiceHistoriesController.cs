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
    public class CarServiceHistoriesController : ControllerBase
    {
        private readonly IGarageContext _context;

        public CarServiceHistoriesController(IGarageContext context)
        {
            _context = context;
        }
        
        // GET: api/CarServiceHistories
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CarServiceHistory>>> GetCarServiceHistory()
        {
            if (_context.CarServiceHistory != null)
                return Ok(await _context.CarServiceHistory);

            return NotFound();
        }

        // GET: api/CarServiceHistories/5
        [HttpGet("{id}")]
        public async Task<ActionResult<CarServiceHistory>> GetCarServiceHistory(int id)
        {
            var carServiceHistory = _context.CarServiceHistory.Result.FirstOrDefault(csh => csh.Id == id);

            if (carServiceHistory == null)
            {
                return NotFound();
            }

            return carServiceHistory;
        }

        // PUT: api/CarServiceHistories/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCarServiceHistory(int id, CarServiceHistory carServiceHistoryUpdate)
        {
            var carServiceHistory = _context.CarServiceHistory.Result.FirstOrDefault(cas => cas.Id == id);

            _context.CarServiceHistory.Result.Remove(carServiceHistory);
            _context.CarServiceHistory.Result.Add(carServiceHistoryUpdate);

            return NoContent();
        }

        // POST: api/CarServiceHistories
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<CarServiceHistory>> PostCarServiceHistory(CarServiceHistory carServiceHistory)
        {
            _context.CarServiceHistory.Result.Add(carServiceHistory);
            return NoContent();
        }

        // DELETE: api/CarServiceHistories/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCarServiceHistory(int id)
        {
            var carServiceHistory = _context.CarServiceHistory.Result.FirstOrDefault(cas => cas.Id == id);

            _context.CarServiceHistory.Result.Remove(carServiceHistory);

            return NoContent();
        }

    }
}
