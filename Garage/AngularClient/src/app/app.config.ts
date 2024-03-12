import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { HttpClientModule } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { carReducer } from './core/store/car/car.reducers';
import { provideEffects } from '@ngrx/effects';
import { CarEffects } from './core/store/car/car.effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    importProvidersFrom(HttpClientModule),
    provideStore({
      car: carReducer
    }),
    provideEffects([CarEffects]),
    provideStoreDevtools({ maxAge: 25, logOnly: false })
  ]
};
