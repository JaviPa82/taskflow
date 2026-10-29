import { Component, input,inject } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { TaskList } from '../../components/task-list/task-list';
@Component({
  selector: 'app-statistics',
  standalone: true,
  imports: [ TaskList ],
  templateUrl: './statistics.html',
  styleUrl: './statistics.scss',
})
export class Statistics {
  
  taskService = inject(TaskService);
 
}
