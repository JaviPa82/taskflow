import { Component, input, output } from '@angular/core';
import { Task } from '../../models/task.interface';
import { TaskItem } from '../task-item/task-item';
import { TaskPapelera } from '../task-papelera/task-papelera';

@Component({
  selector: 'app-task-list',
  imports: [TaskItem, TaskPapelera],
  templateUrl: './task-list.html',
  styleUrl: './task-list.scss'
})
export class TaskList {

  tareas = input<Task[]>([]);
  papelera = input<Task[]>([]);
  
  completadaClick = output<number>();

  onCompletada(id: number){

    this.completadaClick.emit(id);

  }

  eliminarClick = output<number>();

  eliminarTarea(id: number) {
    this.eliminarClick.emit(id);
  }

  modificarClick = output<number>();

  editarTarea(id: number) {
    this.modificarClick.emit(id);
  }

  restaurarClick = output<number>();

  restaurarTarea(id: number) {
    this.restaurarClick.emit(id);
  }

  eliminarDefinitivoClick = output<number>();
  
  eliminarDefinitivamente(id: number) {
    this.eliminarDefinitivoClick.emit(id);
  }
}