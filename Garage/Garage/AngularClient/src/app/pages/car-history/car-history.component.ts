import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { GarageService } from '@services/garage.service';
import { CarHistory, CarStatusEnum } from '@models/garage.model';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { getCarStatusLabel } from '@utils/car-history.utils'

@Component({
  selector: 'app-car-history',
  standalone: true,
  imports: [AsyncPipe, CommonModule],
  templateUrl: './car-history.component.html',
  styleUrl: './car-history.component.scss'
})
export class CarHistoryComponent implements OnInit {
  carId!: string | null;
  carHistory$!: Observable<CarHistory[]>;
  loading$!: Observable<boolean>;

  constructor(private route: ActivatedRoute, private service: GarageService) {
    this.loading$ = this.service._waitIndicator$;
  }

  ngOnInit(): void {
    this.carId = this.route.snapshot.paramMap.get("carId");

    if (this.carId)
      this.carHistory$ = this.service.carHistory$(+this.carId);
  }

  getCarStatusLabel(carStatus: CarStatusEnum): string {
    return getCarStatusLabel(carStatus);
  }
}
