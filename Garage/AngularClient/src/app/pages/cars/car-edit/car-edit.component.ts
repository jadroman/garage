import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Car, EditModeEnum } from '@models/garage.model';
import { provideComponentStore } from '@ngrx/component-store';
import { isNumeric } from '@utils/car-history.utils';
import { CarStore } from 'app/core/store/car.store';

@Component({
  selector: 'app-car-edit',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  providers: [provideComponentStore(CarStore)],
  templateUrl: './car-edit.component.html',
  styleUrl: './car-edit.component.scss'
})
export class CarEditComponent implements OnInit {
  private readonly carStore = inject(CarStore);
  @Input() formOpenedInModal: boolean = false;
  @Output() closeCarModal = new EventEmitter<Car>();
  carDetails$ = this.carStore.carDetails$;

  constructor(private route: ActivatedRoute, private router: Router) {
  }

  form = new FormGroup({
    brandModelYear: new FormControl('', Validators.required),
    licensePlate: new FormControl('', Validators.required),
    vehicleIdNumber: new FormControl('', Validators.required)
  });

  importedEditModeEnum = EditModeEnum;
  id!: string | null;
  editMode!: EditModeEnum;

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get("id");

    if (this.id === 'new' || this.formOpenedInModal) {
      this.editMode = EditModeEnum.addNew;
    }

    if (this.id && isNumeric(this.id)) {
      this.editMode = EditModeEnum.update;

      this.carStore.getCar(+this.id);

      this.carDetails$.subscribe((c) => {
        this.form.patchValue(c);
      });
    }
  }

  cancel() {
    if (this.formOpenedInModal) {
      this.closeCarModal.emit();
    }
    else {
      this.router.navigate(['/car']);
    }
  }

  onSubmit() {
    if (!this.form.valid) {
      return;
    }

    const carId: number = (this.id) ? +this.id : 0;
    const brandModelYear: string = (this.form.value.brandModelYear !== undefined && this.form.value.brandModelYear !== null) ? this.form.value.brandModelYear : "";
    const licensePlate: string = (this.form.value.licensePlate !== undefined && this.form.value.licensePlate !== null) ? this.form.value.licensePlate : "";
    const vehicleIdNumber: string = (this.form.value.vehicleIdNumber !== undefined && this.form.value.vehicleIdNumber !== null) ? this.form.value.vehicleIdNumber : "";

    const car: Car = { id: carId, brandModelYear: brandModelYear, licensePlate: licensePlate, vehicleIdNumber: vehicleIdNumber };

    if (this.editMode === EditModeEnum.update) {
      this.carStore.updateCar(car);

      this.carStore.updatedCar$.subscribe(() => {
        this.router.navigate(['/car']);
      });

    }
    else if (this.editMode === EditModeEnum.addNew) {
      car.id = 0;

      this.carStore.addCar(car);

      this.carStore.addedCar$.subscribe(c => {
        if (this.formOpenedInModal) {
          if (c) {
            this.closeCarModal.emit(c as Car);
          }
        }
        else {
          this.router.navigate(['/car']);
        }
      });
    }

  }

}
