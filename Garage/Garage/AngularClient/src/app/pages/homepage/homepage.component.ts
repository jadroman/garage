import { Component } from '@angular/core';
import { CarsAtServiceListComponent } from '../../shared/components/cars-at-service-list/cars-at-service-list.component';
import { WorkStartedEnum } from '../../core/models/garage.model';


@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [CarsAtServiceListComponent],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss'
})
export class HomepageComponent {
  public workStarted: WorkStartedEnum = WorkStartedEnum.both;

  setWorkStarted(selected: any) {
    if (selected.selectedIndex === 0)
      this.workStarted = WorkStartedEnum.notStarted
    else if (selected.selectedIndex === 1)
      this.workStarted = WorkStartedEnum.started
    else
      this.workStarted = WorkStartedEnum.both;

    console.log(this.workStarted);
  }


}
