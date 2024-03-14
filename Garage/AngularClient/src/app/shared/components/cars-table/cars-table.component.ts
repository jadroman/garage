import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Car } from '@models/garage.model';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { provideComponentStore } from '@ngrx/component-store';
import { GarageService } from '@services/garage.service';
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



  constructor(private service: GarageService) {
  }

  ngOnInit(): void {
    this.cars$ = this.carStore.cars$;
  }

  pickCar(car: Car) {
    this.selectCar.emit(car);
  }

  deleteCar(carId: number) {
    this.carStore.deleteCar(carId);
  }
}
