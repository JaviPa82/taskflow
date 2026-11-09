import { Component, computed, inject, signal } from '@angular/core';
import { TaskService } from '../../../../core/services/task.service';
import { AuthService } from '../../../../core/services/auth';
import { TaskList } from '../../components/task-list/task-list';

@Component({
  selector: 'app-pending-tasks',
  standalone: true,
  imports: [TaskList],
  templateUrl: './pending-tasks.html',
})


export class PendingTasks {

  constructor() {

  }
  taskService = inject(TaskService);

  authService = inject(AuthService);

  tareasPendientes = this.taskService.tareasPendientes;

  onToggleCompletada(id: number | string) {

    this.taskService.toggleCompletada(id);
  }
  
  onEliminarTarea(id: number |string) {

    this.taskService.eliminarTarea(id);
  
  }

}