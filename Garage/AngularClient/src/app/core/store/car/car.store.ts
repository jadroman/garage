import { Injectable } from "@angular/core";
import { Car } from "@models/garage.model";
import { ComponentStore, OnStateInit, tapResponse } from "@ngrx/component-store";
import { GarageService } from "@services/garage.service";
import { BehaviorSubject, EMPTY, Observable, catchError, pipe, switchMap, tap } from "rxjs";

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
                            console.error('error getting cars: ', error);
                        },
                    ),
                ),
            ),
        ),
    );

    addCar = this.effect((car$: Observable<Car>) =>
        car$.pipe(
            switchMap((car) => {
                const ret = this.garageService.createCar(car)
                ret.subscribe((car) => {
                    this.addedCar$.next(car);
                })
                return ret;
            })
        )
    );

}
