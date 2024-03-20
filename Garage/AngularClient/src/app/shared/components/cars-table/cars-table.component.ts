import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Car } from '@models/garage.model';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { provideComponentStore } from '@ngrx/component-store';
import { CarStore } from 'app/core/store/car.store';

@Component({
  selector: 'app-cars-table',
  standalone: true,
  imports: [AsyncPipe, CommonModule, RouterLink, NgbTooltipModule],
  providers: [provideComponentStore(CarStore)],
  templateUrl: './cars-table.component.html',
  styleUrl: './cars-table.component.scss'
})

export class CarsTableComponent implements OnInit {
  @Input() carPickMode: boolean = false;
  @Output() selectCar = new EventEmitter<Car>();
  private readonly carStore = inject(CarStore);
  cars$ = this.carStore.cars$;

  ngOnInit(): void {
    this.carStore.getCars();
  }

  pickCar(car: Car) {
    this.selectCar.emit(car);
  }

  deleteCar(carId: number) {
    this.carStore.deleteCar(carId);
  }
}
