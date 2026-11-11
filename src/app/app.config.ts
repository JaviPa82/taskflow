import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideEffects } from '@ngrx/effects';

import { routes } from './app.routes';

import { taskReducer } from './features/tasks/store/task.reducer';
import { TaskEffects } from './features/tasks/store/task.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(),

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