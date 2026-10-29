import { Component, computed, inject,signal } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { TaskList } from '../../components/task-list/task-list';

@Component({
  selector: 'app-completed-tasks',
  standalone: true,
  imports: [ TaskList ],
  templateUrl: './completed-tasks.html',
  styleUrl: './completed-tasks.scss',
})
export class CompletedTasks {

  taskService = inject(TaskService);

  tareasCompletadas =  this.taskService.tareasCompletadas;

  onEliminarTarea(id: number) {

    this.taskService.eliminarTarea(id);
  
  }

  onToggleCompletada(id: number) {

    this.taskService.toggleCompletada(id);

  }
  
}
