import { AsyncPipe, CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CarsTableComponent } from 'app/shared/components/cars-table/cars-table.component';
import { ContactsTableComponent } from 'app/shared/components/contacts-table/contacts-table.component';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-cars-list',
  standalone: true,
  imports: [AsyncPipe, CommonModule, RouterLink, CarsTableComponent],
  templateUrl: './cars-list.component.html',
  styleUrl: './cars-list.component.scss'
})
export class CarsListComponent {

}
