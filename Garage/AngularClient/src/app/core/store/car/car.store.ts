import { Injectable } from "@angular/core";
import { Car } from "@models/garage.model";
import { ComponentStore, OnStateInit, tapResponse } from "@ngrx/component-store";
import { GarageService } from "@services/garage.service";
import { BehaviorSubject, EMPTY, Observable, catchError, of, pipe, switchMap, tap } from "rxjs";

export interface CarState {
    cars: Car[];
}

@Injectable()
export class CarStoreService extends ComponentStore<CarState> implements OnStateInit {
    constructor(private readonly garageService: GarageService) {
        super({ cars: [] });
    }

    ngrxOnStateInit() {
        this.getCars();
    }

    addedCar$ = new BehaviorSubject<Car>(null!);

    cars$ = this.select((store) => store.cars);

    readonly getCars = this.effect<void>(
        pipe(
            switchMap(() =>
                this.garageService.getCars().pipe(
                    tapResponse(
                        (response) => {
                            this.patchState({ cars: response });
                        },
                        (error) => {
                            console.error('get cars error: ', error);
                        },
                    ),
                ),
            ),
        ),
    );

    addCar = this.effect((car$: Observable<Car>) =>
        car$.pipe(
            tap((car) => {
                this.garageService.createCar(car).subscribe({
                    next: value => {
                        this.addedCar$.next(value);
                        this.patchState((state) => ({
                            cars: [...state.cars, car]
                        }));
                    },
                    error: err => console.error('create car error: ' + err)
                });
            })
        )
    );

    deleteCar = this.effect((carId$: Observable<number>) =>
        carId$.pipe(
            tap((carId) => {
                this.garageService.deleteCar(carId).subscribe({
                    next: () => {
                        this.patchState((state) => ({
                            cars: state.cars.filter((car) => car.id !== carId)
                        }));
                    },
                    error: err => console.error('delete car error: ' + err)
                });
            })
        )
    );

}
