import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { GarageService } from "@services/garage.service";
import { switchMap, map, delay } from "rxjs";
import { getCars, getCarsSuccess } from "./car.actions";
import { Car } from "@models/garage.model";

@Injectable()
export class CarEffects {
    constructor(private readonly actions$: Actions, private readonly garageService: GarageService) {
    }

    getCars$ = createEffect(() =>
        this.actions$.pipe(
            ofType(getCars.type),
            switchMap(() => this.garageService._cars$.asObservable()),
            map((cars: Car[]) => getCarsSuccess({ cars }))
        )
    );
}