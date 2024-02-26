import { Routes } from '@angular/router';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { CarHistoryComponent } from './pages/car-history/car-history.component';
import { ContactsListComponent } from './pages/contacts/contacts-list/contacts-list.component';
import { ContactEditComponent } from './pages/contacts/contact-edit/contact-edit.component';

export const routes: Routes = [
    {
        path: 'homepage',
        component: HomepageComponent
    },
    {
        path: 'contact',
        component: ContactsListComponent
    },
    {
        path: 'contact/:id',
        component: ContactEditComponent
    },
    {
        path: 'contact/new',
        component: ContactEditComponent
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
