import { Component, input } from '@angular/core';
import { Task } from '../../models/task.interface';
import { TaskItem } from '../task-item/task-item';

@Component({
  selector: 'app-task-list',
  imports: [TaskItem],
  templateUrl: './task-list.html',
  styleUrl: './task-list.scss'
})
export class TaskList {

  tareas = input<Task[]>([]);

}