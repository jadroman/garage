import { CommonModule } from '@angular/common';
import { Component, TemplateRef, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CarAtService, ContactPerson, WorkComplexityEnum } from '@models/garage.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { getWorkComplexityLabel } from '@utils/car-at.service.utils';
import { ContactsTableComponent } from 'app/shared/components/contacts-table/contacts-table.component';
import { ContactEditComponent } from '../contacts/contact-edit/contact-edit.component';

@Component({
  selector: 'app-car-at-service-edit',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, ContactsTableComponent, ContactEditComponent],
  templateUrl: './car-at-service-edit.component.html',
  styleUrl: './car-at-service-edit.component.scss'
})
export class CarAtServiceEditComponent {
  private modalService = inject(NgbModal);
  public selectedContact!: ContactPerson;
  public workComplexities: WorkComplexityEnum[] = Object.values(WorkComplexityEnum) as WorkComplexityEnum[];
  public carAtService!: CarAtService;

  form = new FormGroup({
    workNeedToBeDone: new FormControl('', Validators.required),
    estimatedDurationInHours: new FormControl(''),
    estimatedComplexity: new FormControl('')
  });

  getWorkComplexityLabel(workComplexity: WorkComplexityEnum): string {
    return getWorkComplexityLabel(workComplexity);
  }

  selectContact(contact: ContactPerson) {
    this.selectedContact = contact;
    this.modalService.dismissAll();
  }

  closeModal(contact: ContactPerson) {
    this.selectedContact = contact;
    this.modalService.dismissAll();
  }

  onSubmit() {
  }

  open(content: TemplateRef<any>) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
      (result) => {
        //this.closeResult = `Closed with: ${result}`;
      },
      (reason) => {
        //this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      },
    );
  }
}
