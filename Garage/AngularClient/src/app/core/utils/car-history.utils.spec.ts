import { CarStatusEnum } from "@models/garage.model";
import { getCarStatusLabel, isNumeric } from "@utils/car-history.utils";

it("#getCarStatusLabel should return CarCheckedIn", () => {
    let carStatus = getCarStatusLabel(CarStatusEnum.CarCheckedIn);
    expect(carStatus).toBe("Car Checked In");
});

it("#isNumeric should return 'true' for '1'", () => {
    let carStatus = isNumeric("1");
    expect(carStatus).toBe(true);
});

it("#isNumeric should return 'false' for 'a'", () => {
    let carStatus = isNumeric("a");
    expect(carStatus).toBe(false);
});