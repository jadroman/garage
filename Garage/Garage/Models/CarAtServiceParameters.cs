namespace Garage.Models
{
    public class CarAtServiceParameters
    {

        public WorkStartedEnum WorkStarted { get; set; } = WorkStartedEnum.both;
        public bool LowestComplexity { get; set; } = false;
        public bool NewlyArrived { get; set; } = false;
        public bool LowestDuration { get; set; } = false;
    }
}
