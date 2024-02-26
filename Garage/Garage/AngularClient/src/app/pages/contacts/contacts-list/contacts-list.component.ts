import { AsyncPipe, CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ContactPerson } from '@models/garage.model';
import { GarageService } from '@services/garage.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-contacts-list',
  standalone: true,
  imports: [AsyncPipe, CommonModule],
  templateUrl: './contacts-list.component.html',
  styleUrl: './contacts-list.component.scss'
})
export class ContactsListComponent {
  contacts$!: Observable<ContactPerson[]>;
  loading$!: Observable<boolean>;

  constructor(private service: GarageService) {
    this.loading$ = this.service.loadingContacts$;
    this.contacts$ = this.service.contacts$();
  }

}
