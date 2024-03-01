import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ContactPerson, EditModeEnum } from '@models/garage.model';
import { GarageService } from '@services/garage.service';
import { isNumeric } from '@utils/car-history.utils';
import { Observable, take } from 'rxjs';

@Component({
  selector: 'app-contact-edit',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './contact-edit.component.html',
  styleUrl: './contact-edit.component.scss'
})
export class ContactEditComponent implements OnInit {
  loading$!: Observable<boolean>;
  @Input() formOpenedInModal: boolean = false;
  @Output() closeContactModal = new EventEmitter<ContactPerson>();

  constructor(private route: ActivatedRoute, private service: GarageService, private router: Router) {
    this.loading$ = this.service._waitIndicator$;
  }

  form = new FormGroup({
    name: new FormControl('', Validators.required),
    surname: new FormControl('', Validators.required),
    phone: new FormControl('', Validators.required)
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

      this.service.contact$(+this.id).subscribe(c => {
        this.form.patchValue(c);
      });
    }
  }

  onSubmit() {
    if (!this.form.valid) {
      return;
    }

    const contactId: number = (this.id) ? +this.id : 0;
    const name: string = (this.form.value.name !== undefined && this.form.value.name !== null) ? this.form.value.name : "";
    const surname: string = (this.form.value.surname !== undefined && this.form.value.surname !== null) ? this.form.value.surname : "";
    const phone: string = (this.form.value.phone !== undefined && this.form.value.phone !== null) ? this.form.value.phone : "";

    const contact: ContactPerson = { id: contactId, name: name, surname: surname, phone: phone };

    if (this.editMode === EditModeEnum.update) {
      this.service._waitIndicator$.next(true);
      this.service.updateContact(contact.id, contact).pipe(take(1)).subscribe(() => {
        this.service._waitIndicator$.next(false);
        this.router.navigate(['/contact']);
      });
    }
    else if (this.editMode === EditModeEnum.addNew) {
      contact.id = 0;
      this.service._waitIndicator$.next(true);
      this.service.createContact(contact).pipe(take(1)).subscribe(() => {
        this.service._waitIndicator$.next(false);
        if (this.formOpenedInModal) {
          this.closeContactModal.emit(contact);
        }
        else {
          this.router.navigate(['/contact']);
        }
      });
    }

  }

}
