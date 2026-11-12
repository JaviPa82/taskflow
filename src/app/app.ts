import { Component, inject } from '@angular/core';
import { Header } from './layout/header/header';
import { RouterOutlet, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { loadTasks } from './features/tasks/store/task.actions';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    Header,
    RouterOutlet
  ],
  templateUrl: './app.html'
})
export class App {
  private store = inject(Store);

  constructor() {

    const tasks = JSON.parse(
      localStorage.getItem(
        'taskflow_tasks'
      ) ?? '[]'
    );

    const trash = JSON.parse(
      localStorage.getItem(
        'taskflow_trash'
      ) ?? '[]'
    );

    this.store.dispatch(
      loadTasks({
        tasks,
        trash
      })
    );

  }
}