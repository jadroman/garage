import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ContactPerson, EditModeEnum } from '@models/garage.model';
import { GarageService } from '@services/garage.service';
import { isNumeric } from '@utils/car-history.utils';
import { Observable, take } from 'rxjs';

@Component({
  selector: 'app-contact-edit',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './contact-edit.component.html',
  styleUrl: './contact-edit.component.scss'
})
export class ContactEditComponent implements OnInit {
  loading$!: Observable<boolean>;
  @Input() formOpenedInModal: boolean = false;
  @Output() closeModal = new EventEmitter<ContactPerson>();

  constructor(private route: ActivatedRoute, private service: GarageService, private router: Router) {
    this.loading$ = this.service.loadingContact$;
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
    const contactId: number = (this.id) ? +this.id : 0;
    const name: string = (this.form.value.name !== undefined && this.form.value.name !== null) ? this.form.value.name : "";
    const surname: string = (this.form.value.surname !== undefined && this.form.value.surname !== null) ? this.form.value.surname : "";
    const phone: string = (this.form.value.phone !== undefined && this.form.value.phone !== null) ? this.form.value.phone : "";

    const contact: ContactPerson = { id: contactId, name: name, surname: surname, phone: phone };

    if (this.editMode === EditModeEnum.update) {
      this.service.updateContact$(contact).pipe(take(1)).subscribe(() => {
        this.router.navigate(['/contact']);
      });
    }
    else if (this.editMode === EditModeEnum.addNew) {
      contact.id = 0;
      this.service.createContact$(contact).pipe(take(1)).subscribe(() => {
        if (this.formOpenedInModal) {
          this.closeModal.emit(contact);
        }
        else {
          this.router.navigate(['/contact']);
        }
      });
    }

  }

}
