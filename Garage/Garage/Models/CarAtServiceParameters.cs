using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Garage.Models
{
    public class CarAtServiceParameters
    {

        public bool WorkStarted { get; set; } = false;
        public bool LowestComplexity { get; set; } = false;
        public bool NewlyArrived { get; set; } = false;
        public bool LowestDuration { get; set; } = false;
    }
}
