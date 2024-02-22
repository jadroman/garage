import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs';
import { AsyncPipe, CommonModule } from '@angular/common';
import { WorkStartedEnum, CarAtService } from '../../../core/models/garage.model';
import { GarageService } from '../../../core/services/garage.service';

@Component({
  selector: 'app-cars-at-service-list',
  standalone: true,
  imports: [AsyncPipe, CommonModule],
  templateUrl: './cars-at-service-list.component.html',
  styleUrl: './cars-at-service-list.component.scss'
})
export class CarsAtServiceListComponent implements OnChanges {
  @Input() workStarted: WorkStartedEnum = WorkStartedEnum.both

  carsAtService$!: Observable<CarAtService[]>;
  loading$!: Observable<boolean>;

  constructor(private service: GarageService) {
    this.loading$ = this.service.loading$;
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.carsAtService$ = this.service.carsAtService$(this.getRequestParams(this.workStarted));
  }

  getRequestParams(workStarted: WorkStartedEnum): any {
    let params: any = {};

    params[`workStarted`] = workStarted;


    return params;
  }

}
