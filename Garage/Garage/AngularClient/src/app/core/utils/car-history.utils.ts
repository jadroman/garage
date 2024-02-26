import { CarStatusEnum } from "../models/garage.model";

export function getCarStatusLabel(carStatus: CarStatusEnum): string {
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
            label = 'Car Ready To Pick Up'
            break;
        default:
            label = "Unknown status";
    }

    return label;
}