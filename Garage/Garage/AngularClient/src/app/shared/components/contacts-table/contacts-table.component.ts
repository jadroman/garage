import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
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

  constructor(private service: GarageService, private router: Router) {
    this.loading$ = this.service.loadingContacts$;
    this.contacts$ = this.service.contacts$();
  }

  pickContact(contact: ContactPerson) {
    this.selectContact.emit(contact);
  }

  deleteContact(contactId: number) {
    this.service.deleteContact$(contactId).pipe(take(1)).subscribe(() => {
      this.router.navigate(['/contact']);
    });
  }
}
