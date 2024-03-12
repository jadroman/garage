import { Car } from "@models/garage.model";
import { createAction, props } from "@ngrx/store";

const prefix = '[Cars]';

export const getCars = createAction(`${prefix} Get Cars`);

export const getCarsSuccess = createAction(
    `${getCars.type} Success`,
    props<{
        cars: Car[];
    }>()
);