import { Injectable } from "@angular/core";
import { CancelHistoryStatusReq, CarHistory } from "@models/garage.model";
import { ComponentStore, tapResponse } from "@ngrx/component-store";
import { GarageService } from "@services/garage.service";
import { Observable, switchMap, tap } from "rxjs";

export interface CarHistoryState {
    carHistory: CarHistory[];
    histroyItemCanceled: boolean;
}

@Injectable()
export class CarHistoryStore extends ComponentStore<CarHistoryState> {
    constructor(private readonly garageService: GarageService) {
        super({ carHistory: [], histroyItemCanceled: false });
    }

    carHistory$ = this.select((store) => store.carHistory);
    histroyItemCanceled$ = this.select((store) => store.histroyItemCanceled);

    getCarHistory = this.effect((carId$: Observable<number>) =>
        carId$.pipe(
            switchMap((carId) =>
                this.garageService.getCarHistory(carId).pipe(
                    tapResponse(
                        (response) => {
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
                        this.patchState((state) => ({
                            carHistory: state.carHistory.map(ch => {
                                if (ch.id == cancelation.carHistoryId) {
                                    ch.statusIsCanceled = true;
                                    ch.note = cancelation.reasonToCancel;
                                }
                                return ch;
                            }),
                            histroyItemCanceled: true
                        }));
                    },
                    error: err => console.error('cancelcarHistory error: ' + err)
                });
            })
        )
    );
}
