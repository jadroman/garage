using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Garage.Models
{
    public class Car
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string? LicensePlate { get; set; }
        public string? BrandModelYear { get; set; }
        public string? VehicleIdNumber { get; set; }
    }
}
