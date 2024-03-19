import { Injectable } from "@angular/core";
import { CarAtService } from "@models/garage.model";
import { ComponentStore, tapResponse } from "@ngrx/component-store";
import { GarageService } from "@services/garage.service";
import { Observable, Subject, switchMap, tap } from "rxjs";

export interface CarsAtServiceState {
    carsAtService: CarAtService[];
    carAtServiceDetails: CarAtService;
}

@Injectable()
export class CarAtServiceStore extends ComponentStore<CarsAtServiceState> {
    constructor(private readonly garageService: GarageService) {
        super({ carsAtService: [], carAtServiceDetails: {} });
    }

    addedCarAtService$ = new Subject<void>();
    carsAtService$ = this.select((store) => store.carsAtService);
    carAtServiceDetails$ = this.select((store) => store.carAtServiceDetails);

    getCarsAtService = this.effect((params$: Observable<any>) =>
        params$.pipe(
            switchMap((params) =>
                this.garageService.getCarsAtService(params).pipe(
                    tapResponse(
                        (response) => {
                            this.patchState({ carsAtService: response });
                        },
                        (error) => {
                            console.error('get carsAtService error: ', error);
                        },
                    ),
                ),
            ),
        ),
    );

    getCarAtServiceDetails = this.effect((carId$: Observable<number>) =>
        carId$.pipe(
            switchMap((carId) =>
                this.garageService.getCarAtService(carId).pipe(
                    tapResponse(
                        (response) => {
                            this.patchState({ carAtServiceDetails: response });
                        },
                        (error) => {
                            console.error('get carAtServiceDetails error: ', error);
                        },
                    ),
                ),
            ),
        ),
    );

    addCarAtService = this.effect((car$: Observable<CarAtService>) =>
        car$.pipe(
            tap((carAtService) => {
                this.garageService.createCarAtService(carAtService).subscribe({
                    next: () => {
                        this.addedCarAtService$.next();
                        this.patchState((state) => ({
                            carsAtService: [...state.carsAtService, carAtService]
                        }));
                    },
                    error: err => console.error('create carAtService error: ' + err)
                });
            })
        )
    );
}
