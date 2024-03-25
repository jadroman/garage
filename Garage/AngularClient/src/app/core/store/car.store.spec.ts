import { HttpClientTestingModule } from '@angular/common/http/testing';
import { GarageService } from "@services/garage.service";
import { TestBed, waitForAsync } from '@angular/core/testing';
import { Car } from '@models/garage.model';
import { of } from "rxjs";
import { CarStore } from 'app/core/store/car.store';

describe('CarStore', () => {
    let garageService: GarageService;
    let carStore: CarStore;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [GarageService, CarStore]
        });

        garageService = TestBed.inject(GarageService);
        carStore = TestBed.inject(CarStore);

    }));

    it('#cars$ should return cars', () => {
        const data: Car[] = [{ id: 1, licensePlate: 'RI-4545EN' }, { id: 2, licensePlate: 'ZG-4545EN' }];
        spyOn(garageService, 'getCars').and.returnValue(of(data));
        carStore.getCars();

        carStore.cars$.subscribe((value) => {
            expect(value).toBe(data);
        });
    });
});