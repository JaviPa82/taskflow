import { Component, inject } from '@angular/core';
import { Header } from './layout/header/header';
import { TaskService } from './core/services/task.service';
import { RouterOutlet, RouterLink } from '@angular/router';


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
  taskService = inject(TaskService);
}