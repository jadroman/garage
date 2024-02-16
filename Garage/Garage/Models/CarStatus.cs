using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Garage.Models
{
    public enum CarStatusEnum
    {
        StartWorkingOnCar = 1,
        WaitingForPart = 2,
        WorkIsDone = 3,
        ReadyForPickUp = 4,
        ClientTookOverTheCar = 5
    }
}
