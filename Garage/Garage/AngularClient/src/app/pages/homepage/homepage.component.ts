import { Component } from '@angular/core';
import { CarsAtServiceListComponent } from '../../shared/components/cars-at-service-list/cars-at-service-list.component';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [CarsAtServiceListComponent],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss'
})
export class HomepageComponent {

}
