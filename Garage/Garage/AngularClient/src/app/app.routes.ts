import { Routes } from '@angular/router';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { CarHistoryComponent } from './pages/car-history/car-history.component';

export const routes: Routes = [
    {
        path: 'homepage',
        component: HomepageComponent
    },
    {
        path: 'carhistory',
        component: CarHistoryComponent
    }
];
