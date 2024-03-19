import { CommonModule } from '@angular/common';
import { Component, TemplateRef, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Car, CarAtService, ContactPerson, WorkComplexityEnum } from '@models/garage.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { getWorkComplexityLabel } from '@utils/car-at-service.utils';
import { ContactsTableComponent } from 'app/shared/components/contacts-table/contacts-table.component';
import { ContactEditComponent } from '../contacts/contact-edit/contact-edit.component';
import { CarsTableComponent } from 'app/shared/components/cars-table/cars-table.component';
import { CarEditComponent } from '../cars/car-edit/car-edit.component';
import { provideComponentStore } from '@ngrx/component-store';
import { CarAtServiceStore } from 'app/core/store/car-at-service.store';

@Component({
  selector: 'app-car-at-service-edit',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, ContactsTableComponent,
    ContactEditComponent, CarsTableComponent, CarEditComponent],
  providers: [provideComponentStore(CarAtServiceStore)],
  templateUrl: './car-at-service-edit.component.html',
  styleUrl: './car-at-service-edit.component.scss'
})
export class CarAtServiceEditComponent {
  private readonly carAtServiceStore = inject(CarAtServiceStore);
  private modalService = inject(NgbModal);
  public selectedContact!: ContactPerson;
  public selectedCar!: Car;
  public workComplexities: WorkComplexityEnum[] = Object.values(WorkComplexityEnum).filter(val => typeof val === 'number') as WorkComplexityEnum[];

  constructor(private router: Router) {
  }

  form = new FormGroup({
    workNeedToBeDone: new FormControl('', Validators.required),
    estimatedDurationInHours: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$")]),
    estimatedComplexity: new FormControl('', Validators.required)
  });

  getWorkComplexityLabel(workComplexity: WorkComplexityEnum): string {
    return getWorkComplexityLabel(workComplexity);
  }

  selectCar(car: Car) {
    this.selectedCar = car;
    this.modalService.dismissAll();
  }

  selectContact(contact: ContactPerson) {
    this.selectedContact = contact;
    this.modalService.dismissAll();
  }

  closeContactModal(contact?: ContactPerson) {
    if (contact) {
      this.selectedContact = contact;
    }
    this.modalService.dismissAll();
  }

  closeCarModal(car?: Car) {
    if (car) {
      this.selectedCar = car;
    }
    this.modalService.dismissAll();
  }

  formIsValid(): boolean {
    if (!this.selectedContact || !this.selectedCar) {
      return false;
    }

    return this.form.valid;
  }

  onSubmit() {
    if (!this.formIsValid()) {
      return;
    }

    const workNeedToBeDone: string = (this.form.value.workNeedToBeDone !== undefined && this.form.value.workNeedToBeDone !== null) ? this.form.value.workNeedToBeDone : "";
    const estimatedDurationInHours: number = (this.form.value.estimatedDurationInHours !== undefined && this.form.value.estimatedDurationInHours !== null) ? +this.form.value.estimatedDurationInHours : 0;
    const estimatedComplexity: number = (this.form.value.estimatedComplexity !== undefined && this.form.value.estimatedComplexity !== null) ? +this.form.value.estimatedComplexity : 0;

    const carAtService: CarAtService =
    {
      id: 0, workNeedToBeDone: workNeedToBeDone, estimatedComplexity: estimatedComplexity,
      estimatedDurationInHours: estimatedDurationInHours, contactPerson: this.selectedContact, car: this.selectedCar
    };

    this.carAtServiceStore.addCarAtService(carAtService);

    this.carAtServiceStore.addedCarAtService$.subscribe(() => {
      this.router.navigate(['/homepage']);
    });
  }

  open(content: TemplateRef<any>) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
      () => {
      },
      () => {
      },
    );
  }
}
