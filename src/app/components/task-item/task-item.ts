import { Component, input, output } from '@angular/core';
import { Task } from '../../models/task.interface';

@Component({
  selector: 'app-task-item',
  imports: [],
  templateUrl: './task-item.html',
  styleUrl: './task-item.scss'
})
export class TaskItem {

  tarea = input.required<Task>();

  completadaClick = output<number>();

  cambiarEstado() {

    this.completadaClick.emit(
      this.tarea().id
    );
  }
  
}