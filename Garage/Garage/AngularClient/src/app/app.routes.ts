import { Routes } from '@angular/router';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { CarHistoryComponent } from './pages/car-history/car-history.component';
import { ContactsListComponent } from './pages/contacts/contacts-list/contacts-list.component';

export const routes: Routes = [
    {
        path: 'homepage',
        component: HomepageComponent
    },
    {
        path: 'contacts-list',
        component: ContactsListComponent
    },
    {
        path: '',
        component: HomepageComponent
    },
    {
        path: 'carhistory/:carId',
        component: CarHistoryComponent
    }
];
