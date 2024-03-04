import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { GarageService } from '@services/garage.service';
import { CarAtService, CarHistory, CarStatusEnum, ContactPerson } from '@models/garage.model';
import { Observable, take } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { getCarStatusLabel } from '@utils/car-history.utils'
import { MarkCanceledCarStatusDirective } from 'app/directives/car-history/mark-canceled-car-status.directive';

@Component({
  selector: 'app-car-history',
  standalone: true,
  imports: [AsyncPipe, CommonModule, MarkCanceledCarStatusDirective],
  templateUrl: './car-history.component.html',
  styleUrl: './car-history.component.scss'
})
export class CarHistoryComponent implements OnInit {
  carId!: string | null;
  carHistory$!: Observable<CarHistory[]>;
  loading$!: Observable<boolean>;
  contact!: ContactPerson;

  constructor(private route: ActivatedRoute, private service: GarageService) {
    this.loading$ = this.service._waitIndicator$;
  }

  ngOnInit(): void {
    this.carId = this.route.snapshot.paramMap.get("carId");

    if (this.carId) {
      this.carHistory$ = this.service.carHistory$(+this.carId);

      this.service._waitIndicator$.next(true);
      this.service.getCarAtService(+this.carId).subscribe(c => {
        this.service._waitIndicator$.next(false);
        const carAtService: CarAtService = c.body;
        this.contact = carAtService.contactPerson;
      })

    }

  }

  getCarStatusLabel(carStatus: CarStatusEnum): string {
    return getCarStatusLabel(carStatus);
  }

  cancelHistoryStatus(carHistoryId: number) {
    this.service._waitIndicator$.next(true);
    this.service.cancelHistoryStatus(carHistoryId).subscribe(() => {
      this.service._waitIndicator$.next(false);
      if (this.carId) {
        this.service.getCarHistory(+this.carId);
      }
    });

  }
}
