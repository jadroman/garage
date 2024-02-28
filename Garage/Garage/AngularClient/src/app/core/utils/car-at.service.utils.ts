import { WorkComplexityEnum } from "../models/garage.model";

export function getWorkComplexityLabel(carStatus: WorkComplexityEnum): string {
    var label: string = '';

    switch (carStatus) {
        case WorkComplexityEnum.VerySimple:
            label = 'Very Simple'
            break;
        case WorkComplexityEnum.Simple:
            label = 'Simple'
            break;
        case WorkComplexityEnum.Intermediate:
            label = 'Intermediate'
            break;
        case WorkComplexityEnum.High:
            label = 'High'
            break;
        case WorkComplexityEnum.VeryHigh:
            label = 'Very High'
            break;
        default:
            label = "Unknown Complexity";
    }

    return label;
}