import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CarHistory, CarStatusEnum } from '@models/garage.model';
import { provideComponentStore } from '@ngrx/component-store';
import { getCarStatusLabel } from '@utils/car-history.utils';
import { CarHistoryStore } from 'app/core/store/car-history.store';

@Component({
  selector: 'app-car-status-edit',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  providers: [provideComponentStore(CarHistoryStore)],
  templateUrl: './car-status-edit.component.html',
  styleUrl: './car-status-edit.component.scss'
})
export class CarStatusEditComponent {
  private readonly carHistoryStore = inject(CarHistoryStore);
  @Input() carId!: string | null;
  @Output() closeModal = new EventEmitter<boolean>();
  public carStatuses: CarStatusEnum[] = Object.values(CarStatusEnum).filter(val => typeof val === 'number') as CarStatusEnum[];

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
    const carHistory: CarHistory = { id: 0, note: note, carStatus: carStatus, car: { id: carId } };

    this.carHistoryStore.addCarHistory(carHistory);

    this.carHistoryStore.histroyItemAdded$.subscribe(() => {
      this.closeModal.emit();
    });
  }
}

