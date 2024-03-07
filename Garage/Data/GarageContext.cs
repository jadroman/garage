using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Garage.Models;

namespace Garage.Data
{
    public class GarageContext : IGarageContext
    {
        public Task<List<ContactPerson>> ContactPersons { get; set; }
        public Task<List<Car>> Cars { get; set; }
        public Task<List<CarAtService>> CarsAtService { get; set; }
        public Task<List<CarServiceHistory>> CarServiceHistory { get; set; }
    }
}
