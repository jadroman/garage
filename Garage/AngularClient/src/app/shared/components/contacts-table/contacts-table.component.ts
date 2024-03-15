import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ContactPerson } from '@models/garage.model';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { provideComponentStore } from '@ngrx/component-store';
import { GarageService } from '@services/garage.service';
import { ContactStoreService } from 'app/core/store/contact.store';
import { Observable, take } from 'rxjs';

@Component({
  selector: 'app-contacts-table',
  standalone: true,
  imports: [AsyncPipe, CommonModule, RouterLink, NgbTooltipModule],
  providers: [provideComponentStore(ContactStoreService)],
  templateUrl: './contacts-table.component.html',
  styleUrl: './contacts-table.component.scss'
})
export class ContactsTableComponent implements OnInit {
  @Input() contactPickMode: boolean = false;
  @Output() selectContact = new EventEmitter<ContactPerson>();
  contacts$!: Observable<ContactPerson[]>

  private readonly contactStore = inject(ContactStoreService);

  ngOnInit(): void {
    this.contacts$ = this.contactStore.contacts$;
  }

  pickContact(contact: ContactPerson) {
    this.selectContact.emit(contact);
  }

  deleteContact(contactId: number) {
    this.contactStore.deleteContact(contactId);
  }
}
