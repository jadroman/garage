namespace Garage.Models
{
    public class CarAtServiceParameters
    {

        public WorkStartedEnum WorkStarted { get; set; } = WorkStartedEnum.both;
        public SortCarsByEnum SortCarsBy { get; set; } = SortCarsByEnum.newlyArrived;
    }
}
