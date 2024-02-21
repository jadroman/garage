import { Component, OnInit } from '@angular/core';
import { GarageService } from '../../../core/services/garage.service';
import { CarAtService } from '../../../core/models/garage.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-cars-at-service-list',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './cars-at-service-list.component.html',
  styleUrl: './cars-at-service-list.component.scss'
})
export class CarsAtServiceListComponent {
  carsAtService$!: Observable<CarAtService[]>;

  constructor(private service: GarageService) {
    this.carsAtService$ = service.carsAtService$;
  }


}
