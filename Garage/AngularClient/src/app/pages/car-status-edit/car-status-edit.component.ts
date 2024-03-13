import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Car, CarHistory, CarStatusEnum } from '@models/garage.model';
import { GarageService } from '@services/garage.service';
import { getCarStatusLabel } from '@utils/car-history.utils';
import { Observable, take } from 'rxjs';

@Component({
  selector: 'app-car-status-edit',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './car-status-edit.component.html',
  styleUrl: './car-status-edit.component.scss'
})
export class CarStatusEditComponent {
  loading$!: Observable<boolean>;
  @Input() carId!: string | null;;
  @Output() closeModal = new EventEmitter<boolean>();
  public carStatuses: CarStatusEnum[] = Object.values(CarStatusEnum).filter(val => typeof val === 'number') as CarStatusEnum[];


  constructor(private route: ActivatedRoute, private service: GarageService, private router: Router) {
    this.loading$ = this.service._waitIndicator$;
  }

  form = new FormGroup({
    carStatus: new FormControl('', Validators.required),
    note: new FormControl('')
  });

  cancel(update: boolean) {
    this.closeModal.emit(update);
  }

  getCarStatusLabel(carStatusEnum: CarStatusEnum): string {
    return getCarStatusLabel(carStatusEnum);
  }

  onSubmit() {
    if (!this.form.valid) {
      return;
    }

    const carStatus: number = (this.form.value.carStatus !== undefined && this.form.value.carStatus !== null) ? +this.form.value.carStatus : 0;
    const note: string = (this.form.value.note !== undefined && this.form.value.note !== null) ? this.form.value.note : "";
    const carId: number = this.carId ? +this.carId : 0;
    const carHistory: CarHistory = { id: 0, note: note, carStatus: carStatus };

    this.service._waitIndicator$.next(true);
    this.service.createHistoryStatus(carHistory, carId).pipe(take(1)).subscribe(() => {
      this.service._waitIndicator$.next(false);
      this.closeModal.emit(true);
    });

  }
}
