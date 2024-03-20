import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ContactPerson } from '@models/garage.model';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { provideComponentStore } from '@ngrx/component-store';
import { ContactStore } from 'app/core/store/contact.store';

@Component({
  selector: 'app-contacts-table',
  standalone: true,
  imports: [AsyncPipe, CommonModule, RouterLink, NgbTooltipModule],
  providers: [provideComponentStore(ContactStore)],
  templateUrl: './contacts-table.component.html',
  styleUrl: './contacts-table.component.scss'
})
export class ContactsTableComponent implements OnInit {
  @Input() contactPickMode: boolean = false;
  @Output() selectContact = new EventEmitter<ContactPerson>();
  private readonly contactStore = inject(ContactStore);
  contacts$ = this.contactStore.contacts$;


  ngOnInit(): void {
    this.contactStore.getContacts();
  }

  pickContact(contact: ContactPerson) {
    this.selectContact.emit(contact);
  }

  deleteContact(contactId: number) {
    this.contactStore.deleteContact(contactId);
  }
}
