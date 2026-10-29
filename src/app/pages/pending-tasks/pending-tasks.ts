import { Component, computed, inject, signal } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { TaskList } from '../../components/task-list/task-list';

@Component({
  selector: 'app-pending-tasks',
  standalone: true,
  imports: [TaskList],
  templateUrl: './pending-tasks.html',
})
export class PendingTasks {

  taskService = inject(TaskService);

  tareasPendientes = this.taskService.tareasPendientes;

  onToggleCompletada(id: number) {

    this.taskService.toggleCompletada(id);
  }
  
  onEliminarTarea(id: number) {

    this.taskService.eliminarTarea(id);
  
  }

}