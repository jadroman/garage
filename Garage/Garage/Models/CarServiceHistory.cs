using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Garage.Models
{
    public class CarServiceHistory
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public Car Car { get; set; }
        public CarStatusEnum CarStatus { get; set; }
        public DateTime DateOfStatusChange { get; set; }
        public string Note {  get; set; }
    }
}
