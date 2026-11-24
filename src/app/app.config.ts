import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideEffects } from '@ngrx/effects';

import { routes } from './app.routes';

import { taskReducer } from './features/tasks/store/reducers/task.reducer';
import { TaskEffects } from './features/tasks/store/effects/task.effects';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

import { authInterceptor } from './core/interceptors/auth.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([
        authInterceptor
      ])
    ),

    provideStore({
      tasks: taskReducer
    }),

    provideStoreDevtools({
      maxAge: 25
    }),

    provideEffects([
      TaskEffects
    ])
  ]
};