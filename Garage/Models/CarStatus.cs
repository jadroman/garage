namespace Garage.Models
{
    public enum CarStatusEnum
    {
        CarCheckedIn = 0,
        StartWorkingOnCar = 1,
        WaitingForPart = 2,
        WorkIsDone = 3,
        ReadyForPickUp = 4,
        ClientTookOverTheCar = 5
    }
}
