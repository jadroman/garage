import { AsyncPipe, CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ContactPerson } from '@models/garage.model';
import { GarageService } from '@services/garage.service';
import { ContactsTableComponent } from 'app/shared/components/contacts-table/contacts-table.component';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-contacts-list',
  standalone: true,
  imports: [AsyncPipe, CommonModule, RouterLink, ContactsTableComponent],
  templateUrl: './contacts-list.component.html',
  styleUrl: './contacts-list.component.scss'
})
export class ContactsListComponent {

}
