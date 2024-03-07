import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Car, EditModeEnum } from '@models/garage.model';
import { GarageService } from '@services/garage.service';
import { isNumeric } from '@utils/car-history.utils';
import { Observable, take } from 'rxjs';

@Component({
  selector: 'app-car-edit',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './car-edit.component.html',
  styleUrl: './car-edit.component.scss'
})
export class CarEditComponent implements OnInit {
  loading$!: Observable<boolean>;
  @Input() formOpenedInModal: boolean = false;
  @Output() closeCarModal = new EventEmitter<Car>();

  constructor(private route: ActivatedRoute, private service: GarageService, private router: Router) {
    this.loading$ = this.service._waitIndicator$;
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

      this.service.car$(+this.id).subscribe(c => {
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
      this.service._waitIndicator$.next(true);
      this.service.updateCar(car.id, car).pipe(take(1)).subscribe(() => {
        this.service._waitIndicator$.next(false);
        this.router.navigate(['/car']);
      });
    }
    else if (this.editMode === EditModeEnum.addNew) {
      car.id = 0;
      this.service._waitIndicator$.next(true);
      this.service.createCar(car).pipe(take(1)).subscribe(createdCar => {
        this.service._waitIndicator$.next(false);
        if (this.formOpenedInModal) {
          this.closeCarModal.emit(createdCar as Car);
        }
        else {
          this.router.navigate(['/car']);
        }
      });
    }

  }

}
