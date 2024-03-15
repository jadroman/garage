import { Component, Input, OnChanges, OnInit, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { AsyncPipe, CommonModule } from '@angular/common';
import { WorkStartedEnum, CarAtService, SortCarsByEnum, WorkComplexityEnum } from '@models/garage.model';
import { RouterLink } from '@angular/router';
import { getWorkComplexityLabel } from '@utils/car-at-service.utils';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { provideComponentStore } from '@ngrx/component-store';
import { CarAtServiceStoreService } from 'app/core/store/car-at-service.store';

@Component({
  selector: 'app-cars-at-service-list',
  standalone: true,
  imports: [AsyncPipe, CommonModule, RouterLink, NgbTooltipModule],
  providers: [provideComponentStore(CarAtServiceStoreService)],
  templateUrl: './cars-at-service-list.component.html',
  styleUrl: './cars-at-service-list.component.scss'
})
export class CarsAtServiceListComponent implements OnChanges {
  @Input() workStarted: WorkStartedEnum = WorkStartedEnum.both;
  @Input() sortCarsBy: SortCarsByEnum = SortCarsByEnum.newlyArrived;
  carsAtService$!: Observable<CarAtService[]>;
  private readonly carAtServiceStore = inject(CarAtServiceStoreService);

  ngOnChanges(): void {
    this.carsAtService$ = this.carAtServiceStore.carsAtService$;
    this.carAtServiceStore.getCarsAtService(this.getRequestParams(this.workStarted, this.sortCarsBy));
  }

  getWorkComplexityLabel(workComplexity: WorkComplexityEnum): string {
    return getWorkComplexityLabel(workComplexity);
  }

  getRequestParams(workStarted: WorkStartedEnum, sortCarsBy: SortCarsByEnum): any {
    let params: any = {};

    params[`workStarted`] = workStarted;
    params[`sortCarsBy`] = sortCarsBy;

    return params;
  }

}
