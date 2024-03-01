import { Component, Input, OnChanges, SimpleChanges, input } from '@angular/core';
import { Observable } from 'rxjs';
import { AsyncPipe, CommonModule } from '@angular/common';
import { WorkStartedEnum, CarAtService, SortCarsByEnum } from '../../../core/models/garage.model';
import { GarageService } from '../../../core/services/garage.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cars-at-service-list',
  standalone: true,
  imports: [AsyncPipe, CommonModule, RouterLink],
  templateUrl: './cars-at-service-list.component.html',
  styleUrl: './cars-at-service-list.component.scss'
})
export class CarsAtServiceListComponent implements OnChanges {
  @Input() workStarted: WorkStartedEnum = WorkStartedEnum.both;
  @Input() sortCarsBy: SortCarsByEnum = SortCarsByEnum.newlyArrived;

  carsAtService$!: Observable<CarAtService[]>;
  loading$!: Observable<boolean>;

  constructor(private service: GarageService) {
    this.loading$ = this.service._waitIndicator$;
    this.carsAtService$ = this.service.carsAtService$(this.getRequestParams(this.workStarted, this.sortCarsBy));
  }

  ngOnChanges(): void {
    this.service.carsAtService$(this.getRequestParams(this.workStarted, this.sortCarsBy));
  }

  getRequestParams(workStarted: WorkStartedEnum, sortCarsBy: SortCarsByEnum): any {
    let params: any = {};

    params[`workStarted`] = workStarted;
    params[`sortCarsBy`] = sortCarsBy;


    return params;
  }

}
