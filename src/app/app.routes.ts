import { Routes } from '@angular/router';

export const routes: Routes = [
    {
    path: 'pendientes',
    loadComponent: () =>
      import('./pages/pending-tasks/pending-tasks')
        .then(m => m.PendingTasks)
    },
    {
    path: 'completadas',
    loadComponent: () =>
      import('./pages/completed-tasks/completed-tasks')
        .then(m => m.CompletedTasks)
    },
    {
    path: 'todas',
    loadComponent: () =>
      import('./pages/all-tasks/all-tasks')
        .then(m => m.AllTasks)
    },
    {
    path: 'estadisticas',
    loadComponent: () =>
      import('./pages/statistics/statistics')
        .then(m => m.Statistics)
    }
];
