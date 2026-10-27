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

  eliminarClick = output<number>();
  eliminar() {
    this.eliminarClick.emit(this.tarea().id);
  }

  modificarClick = output<number>();
  modificar() {
    this.modificarClick .emit(this.tarea().id);
  }
}