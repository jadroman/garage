import { CarState } from "@models/garage.model";
import { createFeatureSelector, createSelector } from "@ngrx/store";

export const selectCarState = createFeatureSelector<CarState>('car');
export const selectCarsList = createSelector(selectCarState, (state) => state.cars);
export const selectCarIsLoading = createSelector(selectCarState, (state) => state.isLoading);