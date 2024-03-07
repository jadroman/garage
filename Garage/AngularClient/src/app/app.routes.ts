import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'homepage',
        loadComponent: () =>
            import('@pages/homepage/homepage.component')
                .then(m => m.HomepageComponent)
    },
    {
        path: '',
        loadComponent: () =>
            import('@pages/homepage/homepage.component')
                .then(m => m.HomepageComponent)
    },
    {
        path: 'contact',
        loadComponent: () =>
            import('@pages/contacts/contacts-list/contacts-list.component')
                .then(m => m.ContactsListComponent)
    },
    {
        path: 'contact/:id',
        loadComponent: () =>
            import('@pages/contacts/contact-edit/contact-edit.component')
                .then(m => m.ContactEditComponent)
    },
    {
        path: 'contact/new',
        loadComponent: () =>
            import('@pages/contacts/contact-edit/contact-edit.component')
                .then(m => m.ContactEditComponent)
    },
    {
        path: 'car',
        loadComponent: () =>
            import('@pages/cars/cars-list/cars-list.component')
                .then(m => m.CarsListComponent)
    },
    {
        path: 'car/:id',
        loadComponent: () =>
            import('@pages/cars/car-edit/car-edit.component')
                .then(m => m.CarEditComponent)
    },
    {
        path: 'car/new',
        loadComponent: () =>
            import('@pages/cars/car-edit/car-edit.component')
                .then(m => m.CarEditComponent)
    },
    {
        path: 'carhistory/:carId',
        loadComponent: () =>
            import('@pages/car-history/car-history.component')
                .then(m => m.CarHistoryComponent)
    },
    {
        path: 'caratservice/new',
        loadComponent: () =>
            import('@pages/car-at-service-edit/car-at-service-edit.component')
                .then(m => m.CarAtServiceEditComponent)
    }
];
