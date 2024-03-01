import { Routes } from '@angular/router';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { CarHistoryComponent } from './pages/car-history/car-history.component';
import { ContactsListComponent } from './pages/contacts/contacts-list/contacts-list.component';
import { ContactEditComponent } from './pages/contacts/contact-edit/contact-edit.component';
import { CarAtServiceEditComponent } from './pages/car-at-service-edit/car-at-service-edit.component';
import { CarsListComponent } from './pages/cars/cars-list/cars-list.component';
import { CarEditComponent } from './pages/cars/car-edit/car-edit.component';

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
        path: 'car',
        component: CarsListComponent
    },
    {
        path: 'car/:id',
        component: CarEditComponent
    },
    {
        path: 'car/new',
        component: CarEditComponent
    },
    {
        path: '',
        component: HomepageComponent
    },
    {
        path: 'carhistory/:carId',
        component: CarHistoryComponent
    },
    {
        path: 'caratservice/new',
        component: CarAtServiceEditComponent
    }
];
