import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ContactPerson } from '@models/garage.model';
import { GarageService } from '@services/garage.service';
import { Observable, take } from 'rxjs';

@Component({
  selector: 'app-contacts-table',
  standalone: true,
  imports: [AsyncPipe, CommonModule, RouterLink],
  templateUrl: './contacts-table.component.html',
  styleUrl: './contacts-table.component.scss'
})
export class ContactsTableComponent {
  @Input() contactPickMode: boolean = false;
  @Output() selectContact = new EventEmitter<ContactPerson>();


  contacts$!: Observable<ContactPerson[]>;
  loading$!: Observable<boolean>;

  constructor(private service: GarageService) {
    this.loading$ = this.service._waitIndicator$.asObservable();
    this.contacts$ = this.service.contacts$();
  }

  pickContact(contact: ContactPerson) {
    this.selectContact.emit(contact);
  }

  deleteContact(contactId: number) {
    this.service._waitIndicator$.next(true);
    this.service.deleteContact(contactId).pipe(take(1)).subscribe(() => {
      this.service._waitIndicator$.next(false);
      this.service.getContacts();
    });
  }
}
