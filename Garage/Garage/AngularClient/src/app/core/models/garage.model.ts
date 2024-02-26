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

export enum WorkStartedEnum {
    notStarted = 0,
    started = 1,
    both = 2,
}

export enum SortCarsByEnum {
    newlyArrived = 0,
    lowestDuration = 1,
    lowestComplexity = 2,
}

export enum CarStatusEnum {
    CarCheckedIn = 0,
    StartWorkingOnCar = 1,
    WaitingForPart = 2,
    WorkIsDone = 3,
    ReadyForPickUp = 4,
    ClientTookOverTheCar = 5
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

export interface CarHistory {
    id: number,
    car: Car,
    carStatus: CarStatusEnum,
    dateOfStatusChange: Date,
    note: string
}