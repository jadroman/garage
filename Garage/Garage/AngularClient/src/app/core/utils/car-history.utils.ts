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

export function isNumeric(str: string) {
    if (typeof str != "string") return false // we only process strings!  
    return !isNaN(+str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
        !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
}