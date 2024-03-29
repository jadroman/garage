﻿using Garage.Data;
using Garage.Models;
using Microsoft.AspNetCore.Mvc;

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
        public async Task<ActionResult<IEnumerable<CarAtService>>> GetCarAtService([FromQuery] CarAtServiceParameters param)
        {
            var returnValues = GetWhereWorkStarted(param.WorkStarted);

            if (returnValues == null)
                return NotFound();

            if (param.SortCarsBy == SortCarsByEnum.newlyArrived)
                return Ok(returnValues.OrderByDescending(cas => cas.DateOfArrival).ToList());
            else if (param.SortCarsBy == SortCarsByEnum.lowestComplexity)
                return Ok(returnValues.OrderBy(cas => cas.EstimatedComplexity).ToList());
            else if (param.SortCarsBy == SortCarsByEnum.lowestDuration)
                return Ok(returnValues.OrderBy(cas => cas.EstimatedDurationInHours).ToList());
            else
                return Ok(returnValues.OrderByDescending(cas => cas.DateOfArrival).ToList());
        }

        private List<CarAtService> GetWhereWorkStarted(WorkStartedEnum workStarted)
        {
            var returnValues = new List<CarAtService>();
            if (_context.CarsAtService != null)
            {
                foreach (var cas in _context.CarsAtService.Result)
                {
                    var lastCarHistoryEntry = _context.CarServiceHistory.Result.Where(csh => csh.Car?.Id == cas.Car.Id && !csh.statusIsCanceled).OrderByDescending(csh => csh.DateOfStatusChange).FirstOrDefault();

                    if (lastCarHistoryEntry?.CarStatus != CarStatusEnum.ClientTookOverTheCar)
                    {
                        if (workStarted == WorkStartedEnum.started)
                        {
                            if (lastCarHistoryEntry != null && lastCarHistoryEntry.CarStatus != CarStatusEnum.CarCheckedIn)
                                returnValues.Add(cas);
                        }
                        else if (workStarted == WorkStartedEnum.notStarted)
                        {
                            if (lastCarHistoryEntry == null || lastCarHistoryEntry.CarStatus == CarStatusEnum.CarCheckedIn)
                                returnValues.Add(cas);
                        }
                        else
                        {
                            returnValues.Add(cas);
                        }
                    }
                }
            }
            return returnValues;
        }

        // GET: api/CarAtServices/5
        [HttpGet("car/{carId}")]
        public async Task<ActionResult<CarAtService>> GetCarAtService(int carId)
        {
            var carAtService = _context.CarsAtService.Result.FirstOrDefault(cas => cas.Car.Id == carId);

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

            int lastCarAtServiceId = _context.CarsAtService.Result.OrderByDescending(cas => cas.Id).First().Id;
            int lastCarServiceHistoryId = _context.CarServiceHistory.Result.OrderByDescending(csh => csh.Id).First().Id;

            carAtService.Id = ++lastCarAtServiceId;
            carAtService.DateOfArrival = DateTime.UtcNow;

            CarAtService carAtServiceAlreadyExist = _context.CarsAtService.Result.Where(c => c.Car.Id == carAtService.Car.Id).FirstOrDefault();

            if (carAtServiceAlreadyExist is not null)
            {
                _context.CarsAtService.Result.Remove(carAtServiceAlreadyExist);
            }

            _context.CarsAtService.Result.Add(carAtService);

            var carServiceHistory = new CarServiceHistory() { Car = _context.Cars.Result.Where(c => c.Id == carAtService.Car.Id).First(), Id = 0, CarStatus = CarStatusEnum.CarCheckedIn, DateOfStatusChange = DateTime.UtcNow };

            carServiceHistory.Id = ++lastCarServiceHistoryId;
            _context.CarServiceHistory.Result.Add(carServiceHistory);

            return carAtService;
        }

        // DELETE: api/CarAtServices/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCarAtService(int id)
        {
            var carAtService = _context.CarsAtService.Result.FirstOrDefault(cas => cas.Id == id);

            _context.CarsAtService.Result.Remove(carAtService);

            return NoContent();
        }

    }
}
