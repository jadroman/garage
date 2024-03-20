import { AsyncPipe, CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CarsTableComponent } from '@shared/components/cars-table/cars-table.component';

@Component({
  selector: 'app-cars-list',
  standalone: true,
  imports: [AsyncPipe, CommonModule, RouterLink, CarsTableComponent],
  templateUrl: './cars-list.component.html',
  styleUrl: './cars-list.component.scss'
})
export class CarsListComponent {

}
