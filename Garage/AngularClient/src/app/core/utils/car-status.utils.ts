import { CarStatusEnum } from "../models/garage.model";

export function getWorkComplexityLabel(carStatus: CarStatusEnum): string {
    var label: string = '';

    switch (carStatus) {
        case CarStatusEnum.CarCheckedIn:
            label = 'Car Checked In'
            break;
        case CarStatusEnum.StartWorkingOnCar:
            label = 'Start Working On Car'
            break;
        case CarStatusEnum.WaitingForPart:
            label = 'Waiting For Part'
            break;
        case CarStatusEnum.WorkIsDone:
            label = 'Work Is Done'
            break;
        case CarStatusEnum.ReadyToPickUp:
            label = 'Ready To PickUp'
            break;
        case CarStatusEnum.ClientTookOverTheCar:
            label = 'Client Took Over The Car'
            break;
        default:
            label = "Unknown Status";
    }

    return label;
}