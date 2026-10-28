import { Component, input, output } from '@angular/core';
import { Task } from '../../models/task.interface'

@Component({
  selector: 'app-task-papelera',
  imports: [],
  templateUrl: './task-papelera.html',
  styleUrl: './task-papelera.scss',
})
export class TaskPapelera {

  tarea = input.required<Task>();
  restaurarClick = output<number>();

  eliminarDefinitivoClick = output<number>();

  restaurar() {
    this.restaurarClick.emit(
      this.tarea().id
    );
  }

  eliminarDefinitivamente() {
    this.eliminarDefinitivoClick.emit(
      this.tarea().id
    );
  }
}
