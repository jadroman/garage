using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Garage.Models
{
    public class CarAtService
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public ContactPerson ContactPerson { get; set; }
        public Car Car { get; set; }
        public string WorkNeedToBeDone { get; set; }
        public int EstimatedDurationInHours { get; set; }
        public WorkComplexityEnum EstimatedComplexity { get; set; }
        public DateTime DateOfArrival { get; set; }
    }
}
