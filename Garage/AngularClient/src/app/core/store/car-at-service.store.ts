import { Injectable } from "@angular/core";
import { Car, CarAtService } from "@models/garage.model";
import { ComponentStore, OnStateInit, tapResponse } from "@ngrx/component-store";
import { GarageService } from "@services/garage.service";
import { BehaviorSubject, Observable, pipe, switchMap, tap } from "rxjs";

export interface CarsAtServiceState {
    carsAtService: CarAtService[];
}

@Injectable()
export class CarAtServiceStoreService extends ComponentStore<CarsAtServiceState> {
    constructor(private readonly garageService: GarageService) {
        super({ carsAtService: [] });
    }

    addedCarAtService$ = new BehaviorSubject<CarAtService>(null!);
    carsAtService$ = this.select((store) => store.carsAtService);

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

    addCarAtService = this.effect((car$: Observable<CarAtService>) =>
        car$.pipe(
            tap((carAtService) => {
                this.garageService.createCarAtService(carAtService).subscribe({
                    next: (value) => {
                        this.addedCarAtService$.next(value);
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
