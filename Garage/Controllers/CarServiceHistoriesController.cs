﻿using Garage.Data;
using Garage.Models;
using Microsoft.AspNetCore.Mvc;

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
        [HttpGet("car/{carId}")]
        public async Task<ActionResult<IEnumerable<CarServiceHistory>>> GetCarServiceHistory(int carId)
        {
            return Ok(_context.CarServiceHistory.Result.Where(csh => csh.Car?.Id == carId).OrderBy(csh => csh.DateOfStatusChange));

            //return NotFound();
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
        [HttpPost("car/{carId}")]
        public async Task<ActionResult<CarServiceHistory>> PostCarServiceHistory([FromRoute(Name = "carId")] int carId, [FromBody] CarServiceHistory carServiceHistory)
        {
            Car car = _context.Cars.Result.Where(c => c.Id == carId).First();
            int lastHistoryId = _context.CarServiceHistory.Result.OrderByDescending(c => c.Id).First().Id;

            carServiceHistory.Id = ++lastHistoryId;
            carServiceHistory.Car = car;
            carServiceHistory.DateOfStatusChange = DateTime.UtcNow;
            _context.CarServiceHistory.Result.Add(carServiceHistory);

            return NoContent();
        }


        [HttpPut("cancel/{id}")]
        public async Task<IActionResult> CancelCarServiceHistory([FromRoute(Name = "id")] int id, [FromBody] ReasonToCancelDTO reasonToCancel)
        {
            var carServiceHistory = _context.CarServiceHistory.Result.Where(cas => cas.Id == id).First();

            _context.CarServiceHistory.Result.First(cas => cas.Id == id).statusIsCanceled = true;
            _context.CarServiceHistory.Result.First(cas => cas.Id == id).Note = reasonToCancel.ReasonToCancel;

            return NoContent();
        }

    }
}
