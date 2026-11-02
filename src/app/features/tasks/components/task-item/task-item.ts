import { Component, input, output } from '@angular/core';
import { Task } from '../../../../core/models/task.interface';


@Component({
  selector: 'app-task-item',
  imports: [],
  templateUrl: './task-item.html',
  styleUrl: './task-item.scss'
})
export class TaskItem {

  tarea = input.required<Task>();

  mostrarEditar = input<boolean>();

  completadaClick = output<number | string>();
  eliminarClick = output<number | string>();
  modificarClick = output<number | string>();

  cambiarEstado() {
    this.completadaClick.emit(
      this.tarea().id
    );
  }
 
  eliminar() {
    this.eliminarClick.emit(this.tarea().id);
  }

  modificar() {
    this.modificarClick .emit(this.tarea().id);
  }
}