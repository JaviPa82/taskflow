import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth-guard'

export const routes: Routes = [
    {
    path: 'pendientes',
    loadComponent: () =>
      import('./features/tasks/pages/pending-tasks/pending-tasks')
        .then(m => m.PendingTasks),
        canActivate: [authGuard]
    },
    {
    path: 'completadas',
    loadComponent: () =>
      import('./features/tasks/pages/completed-tasks/completed-tasks')
        .then(m => m.CompletedTasks),
        canActivate: [authGuard]
    },
    {
    path: 'todas',
    loadComponent: () =>
      import('./features/tasks/pages/all-tasks/all-tasks')
        .then(m => m.AllTasks),
        canActivate: [authGuard]
    },
    {
    path: 'estadisticas',
    loadComponent: () =>
      import('./features/statistics/statistics/statistics')
        .then(m => m.Statistics),
        canActivate: [authGuard]
    },
    {
    path: 'api-tasks',
    loadComponent: () =>
      import('./features/api/api-tasks/api-tasks')
        .then(m => m.ApiTasks),
        canActivate: [authGuard]
    },
    {
    path: 'api-statistics',
    loadComponent: () =>
      import('./features/api/api-statistics/api-statistics')
        .then(m => m.ApiStatistics),
        canActivate: [authGuard]
    },
    {
    path: 'login',
    loadComponent: () =>
      import('./features/auth/pages/login/login')
        .then(m => m.Login)
    },
    {
      path: 'reactive-form-demo',
      loadComponent: () =>
        import(
          './features/tasks/pages/reactive-form-demo/reactive-form-demo'
        ).then(m => m.ReactiveFormDemo)
    }

];
