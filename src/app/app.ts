import { Component, signal, computed, inject } from '@angular/core';
import { Header } from './components/header/header';
import { Footer } from './components/footer/footer';
import { TaskList } from './components/task-list/task-list';
import { TaskService } from './services/task.service';
import { RouterOutlet, RouterLink } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    Header,
    Footer,
    TaskList,
    RouterOutlet,
    RouterLink
  ],
  templateUrl: './app.html'
})
export class App {

  taskService = inject(TaskService);

  nuevaTarea = signal('');


  
}