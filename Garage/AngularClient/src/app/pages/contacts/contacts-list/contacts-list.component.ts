import { AsyncPipe, CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ContactsTableComponent } from '@shared/components/contacts-table/contacts-table.component';

@Component({
  selector: 'app-contacts-list',
  standalone: true,
  imports: [AsyncPipe, CommonModule, RouterLink, ContactsTableComponent],
  templateUrl: './contacts-list.component.html',
  styleUrl: './contacts-list.component.scss'
})
export class ContactsListComponent {

}
