import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Car } from '@models/garage.model';
import { GarageService } from '@services/garage.service';
import { Observable, take } from 'rxjs';

@Component({
  selector: 'app-cars-table',
  standalone: true,
  imports: [AsyncPipe, CommonModule, RouterLink],
  templateUrl: './cars-table.component.html',
  styleUrl: './cars-table.component.scss'
})
export class CarsTableComponent {
  @Input() carPickMode: boolean = false;
  @Output() selectCar = new EventEmitter<Car>();


  cars$!: Observable<Car[]>;
  loading$!: Observable<boolean>;

  constructor(private service: GarageService) {
    this.loading$ = this.service._waitIndicator$.asObservable();
    this.cars$ = this.service.cars$();
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
