import { Component, OnInit } from '@angular/core';
import { GarageService } from '../../../core/services/garage.service';

@Component({
  selector: 'app-cars-at-service-list',
  standalone: true,
  templateUrl: './cars-at-service-list.component.html',
  styleUrl: './cars-at-service-list.component.scss'
})
export class CarsAtServiceListComponent implements OnInit {

  constructor(private repository: GarageService) { }

  ngOnInit(): void {
    this.getCarsAtService();
  }


  public getCarsAtService = () => {
    this.repository.getData()
      .subscribe((res: any) => {
        console.log(res);
      })
  }
}
