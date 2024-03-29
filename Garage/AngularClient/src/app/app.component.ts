import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { GarageService } from '@services/garage.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Garage';
  readonly defaultUrl = '/homepage';


  constructor(private service: GarageService, private router: Router) {
  }

  seedData() {
    this.service.seedData().subscribe(() => {
      if (this.router.url === this.defaultUrl) {
        window.location.reload();
      }
      else {
        this.router.navigate([this.defaultUrl]);
      }
    });
  }
}
