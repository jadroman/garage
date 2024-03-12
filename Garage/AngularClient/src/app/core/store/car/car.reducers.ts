import { CarState } from "@models/garage.model";
import { Action, createReducer, on } from "@ngrx/store";
import { getCars } from "./car.actions";

export const initialCarState: CarState = {
    cars: [],
    isLoading: false
};

const reducer = createReducer<CarState>(
    initialCarState,
    on(getCars, (state) => {
        return {
            ...state,
            isLoading: true
        };
    }));

export function carReducer(state = initialCarState, actions: Action): CarState {
    return reducer(state, actions);
}