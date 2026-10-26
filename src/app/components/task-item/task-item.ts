import { Component, input } from '@angular/core';
import { Task } from '../../models/task.interface';

@Component({
  selector: 'app-task-item',
  imports: [],
  templateUrl: './task-item.html',
  styleUrl: './task-item.scss'
})
export class TaskItem {

  tarea = input.required<Task>();

}