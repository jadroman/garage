import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ContactPerson, EditModeEnum } from '@models/garage.model';
import { provideComponentStore } from '@ngrx/component-store';
import { isNumeric } from '@utils/car-history.utils';
import { ContactStoreService } from 'app/core/store/contact.store';

@Component({
  selector: 'app-contact-edit',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  providers: [provideComponentStore(ContactStoreService)],
  templateUrl: './contact-edit.component.html',
  styleUrl: './contact-edit.component.scss'
})
export class ContactEditComponent implements OnInit {
  private readonly contactStore = inject(ContactStoreService);
  @Input() formOpenedInModal: boolean = false;
  @Output() closeContactModal = new EventEmitter<ContactPerson>();
  contactDetails$ = this.contactStore.contactDetails$;

  constructor(private route: ActivatedRoute, private router: Router) {
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
      this.contactStore.getContact(+this.id);

      this.contactDetails$.subscribe((c) => {
        this.form.patchValue(c);
      });
    }
  }

  cancel() {
    if (this.formOpenedInModal) {
      this.closeContactModal.emit();
    }
    else {
      this.router.navigate(['/contact']);
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
      this.contactStore.updateContact(contact);
      this.router.navigate(['/contact']);
    }
    else if (this.editMode === EditModeEnum.addNew) {
      contact.id = 0;

      this.contactStore.addContact(contact);

      this.contactStore.addedContact$.subscribe(c => {
        if (this.formOpenedInModal) {
          if (c) {
            this.closeContactModal.emit(c as ContactPerson);
          }
        }
        else {
          this.router.navigate(['/contact']);
        }
      });
    }

  }

}
