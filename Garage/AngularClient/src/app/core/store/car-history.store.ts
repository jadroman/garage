import { Injectable } from "@angular/core";
import { CancelHistoryStatusReq, CarHistory } from "@models/garage.model";
import { ComponentStore, tapResponse } from "@ngrx/component-store";
import { GarageService } from "@services/garage.service";
import { Observable, Subject, switchMap, tap } from "rxjs";

export interface CarHistoryState {
    carHistory: CarHistory[];
}

@Injectable()
export class CarHistoryStore extends ComponentStore<CarHistoryState> {
    constructor(private readonly garageService: GarageService) {
        super({ carHistory: [] });
    }

    carHistory$ = this.select((store) => store.carHistory);
    histroyItemCanceled$ = new Subject<void>;
    histroyItemAdded$ = new Subject<void>;
    carHistoryLoaded$ = new Subject<boolean>();

    getCarHistory = this.effect((carId$: Observable<number>) =>
        carId$.pipe(
            switchMap((carId) =>
                this.garageService.getCarHistory(carId).pipe(
                    tapResponse(
                        (response) => {
                            this.carHistoryLoaded$.next(true);
                            this.patchState({ carHistory: response });
                        },
                        (error) => {
                            console.error('get car history error: ', error);
                        },
                    ),
                ),
            ),
        ),
    );


    cancelcarHistory = this.effect((cancelation$: Observable<CancelHistoryStatusReq>) =>
        cancelation$.pipe(
            tap((cancelation) => {
                this.garageService.cancelHistoryStatus(cancelation).subscribe({
                    next: () => {
                        this.histroyItemCanceled$.next();
                        this.patchState((state) => ({
                            carHistory: state.carHistory.map(ch => {
                                if (ch.id == cancelation.carHistoryId) {
                                    ch.statusIsCanceled = true;
                                    ch.note = cancelation.reasonToCancel;
                                }
                                return ch;
                            })
                        }));
                    },
                    error: err => console.error('cancelcarHistory error: ' + err)
                });
            })
        )
    );

    addCarHistory = this.effect((carHistory$: Observable<CarHistory>) =>
        carHistory$.pipe(
            tap((carHistory) => {
                this.garageService.createHistoryStatus(carHistory).subscribe({
                    next: () => {
                        this.histroyItemAdded$.next();
                        this.patchState((state) => ({
                            carHistory: [...state.carHistory, carHistory]
                        }));
                    },
                    error: err => console.error('addCarHistory error: ' + err)
                });
            })
        )
    );
}
