import { Component, inject } from '@angular/core';
import { TaskService } from '../../../core/services/task.service';

@Component({
  selector: 'app-statistics',
  standalone: true,
  templateUrl: './statistics.html',
  styleUrl: './statistics.scss',
})
export class Statistics {
  taskService = inject(TaskService);
}
