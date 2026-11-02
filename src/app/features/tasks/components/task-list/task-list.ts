import { Component, input, output } from '@angular/core';
import { Task } from '../../../../core/models/task.interface';
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
  mostrarEditar = input(true);
  
  eliminarClick = output<number | string>();
  modificarClick = output<number | string>();
  restaurarClick = output<number | string>();
  eliminarDefinitivoClick = output<number | string>();
  completadaClick = output<number | string>();

  onCompletada(id: number | string){
    this.completadaClick.emit(id);
  }

  eliminarTarea(id: number | string) {
    this.eliminarClick.emit(id);
  }


  editarTarea(id: number | string) {
    this.modificarClick.emit(id);
  }


  restaurarTarea(id: number | string) {
    this.restaurarClick.emit(id);
  }

  
  eliminarDefinitivamente(id: number | string) {
    this.eliminarDefinitivoClick.emit(id);
  }
}