import { Component } from '@angular/core';
import { CarsAtServiceListComponent } from '../../shared/components/cars-at-service-list/cars-at-service-list.component';
import { SortCarsByEnum, WorkStartedEnum } from '../../core/models/garage.model';


@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [CarsAtServiceListComponent],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss'
})
export class HomepageComponent {
  public workStarted: WorkStartedEnum = WorkStartedEnum.both;
  public sortCarsBy: SortCarsByEnum = SortCarsByEnum.newlyArrived;

  setWorkStarted(selected: any) {
    if (selected.selectedIndex === 0)
      this.workStarted = WorkStartedEnum.notStarted
    else if (selected.selectedIndex === 1)
      this.workStarted = WorkStartedEnum.started
    else
      this.workStarted = WorkStartedEnum.both;
  }

  setSortCarBy(selected: any) {
    if (selected.selectedIndex === 0)
      this.sortCarsBy = SortCarsByEnum.newlyArrived
    else if (selected.selectedIndex === 1)
      this.sortCarsBy = SortCarsByEnum.lowestDuration
    else if (selected.selectedIndex === 2)
      this.sortCarsBy = SortCarsByEnum.lowestComplexity
  }

}
