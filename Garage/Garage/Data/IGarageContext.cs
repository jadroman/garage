using Garage.Models;
using System.Collections.Generic;

namespace Garage.Data
{
    public interface IGarageContext
    {
        Task<List<Car>> Cars { get; set; }
        Task<List<CarAtService>> CarsAtService { get; set; }
        Task<List<CarServiceHistory>> CarServiceHistory { get; set; }
        Task<List<CarStatus>> CarStatuses { get; set; }
        Task<List<ContactPerson>> ContactPersons { get; set; }
    }
}