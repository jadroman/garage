import { AsyncPipe, CommonModule } from '@angular/common';
import { Component } from '@angular/core';
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
  contacts$!: Observable<ContactPerson[]>;
  loading$!: Observable<boolean>;

  constructor(private service: GarageService) {
    this.loading$ = this.service.loadingContacts$;
    this.contacts$ = this.service.contacts$();
  }
}
