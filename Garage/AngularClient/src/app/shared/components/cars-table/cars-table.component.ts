import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Car } from '@models/garage.model';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { provideComponentStore } from '@ngrx/component-store';
import { Store, select } from '@ngrx/store';
import { GarageService } from '@services/garage.service';
import { getCars } from 'app/core/store/car/car.actions';
import { selectCarIsLoading, selectCarsList } from 'app/core/store/car/car.selectors';
import { CarStoreService } from 'app/core/store/car/car.store';
import { Observable, map, take, tap } from 'rxjs';

@Component({
  selector: 'app-cars-table',
  standalone: true,
  imports: [AsyncPipe, CommonModule, RouterLink, NgbTooltipModule],
  providers: [provideComponentStore(CarStoreService)],
  templateUrl: './cars-table.component.html',
  styleUrl: './cars-table.component.scss'
})

export class CarsTableComponent implements OnInit {
  @Input() carPickMode: boolean = false;
  @Output() selectCar = new EventEmitter<Car>();
  cars$!: Observable<Car[]>

  private readonly carStore = inject(CarStoreService);



  constructor(private service: GarageService, private readonly store: Store) {
    /*  this.loading$ = this.service._waitIndicator$.asObservable();
    this.cars$ = this.service.cars$(); */
  }

  ngOnInit(): void {
    this.cars$ = this.carStore.cars$;

    /* this.store.dispatch(getCars());

    this.cars$ = this.store.pipe(select(selectCarsList));

    this.loading$ = this.store.pipe(select(selectCarIsLoading));

    this.cars$.subscribe((c) => {

      console.log(c);
    })

    this.loading$.subscribe((L) => {
      console.log(L);
    }) */
  }

  pickCar(car: Car) {
    this.selectCar.emit(car);
  }

  deleteCar(carId: number) {
    this.service._waitIndicator$.next(true);
    this.service.deleteCar(carId).pipe(take(1)).subscribe(() => {
      this.service._waitIndicator$.next(false);
      this.service.getCars();
    });
  }
}
