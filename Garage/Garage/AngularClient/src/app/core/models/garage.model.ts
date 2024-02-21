export interface ContactPerson {
    id: number,
    name: string,
    surname: string,
    phone: string
}

export interface Car {
    id: number,
    licencePlate: string,
    brandModelYear: string,
    vehicleIdNumber: string
}

export enum WorkComplexityEnum {
    VerySimple = 1,
    Simple = 2,
    Intermediate = 3,
    High = 4,
    VeryHigh = 5
}

export interface CarAtService {
    id: number,
    contactPerson: ContactPerson,
    car: Car,
    workNeedToBeDone: string,
    estimatedDurationInHours: number,
    estimatedComplexity: WorkComplexityEnum,
    dateOfArrival: Date
}