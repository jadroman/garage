import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ContactPerson } from '@models/garage.model';
import { GarageService } from '@services/garage.service';
import { Observable } from 'rxjs';

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
    this.loading$ = this.service.loadingContacts$;
    this.contacts$ = this.service.contacts$();
  }

  pickContact(contact: ContactPerson) {
    this.selectContact.emit(contact);
  }
}
