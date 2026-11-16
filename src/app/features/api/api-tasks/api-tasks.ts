import { Component, inject, OnInit,signal} from '@angular/core';

import { Task } from '../../../core/models/task.interface'
import { CommonModule,AsyncPipe } from '@angular/common';

import { Store } from '@ngrx/store';

import { loadApiTasks,createApiTask,deleteApiTask,updateApiTask} from '../../tasks/store/task.actions';

import { selectApiTasks } from '../../tasks/store/task.selectors';

import { AppState } from '../../tasks/store/task.state';

@Component({
  selector: 'app-api-tasks',
  imports: [ CommonModule, AsyncPipe ],
  templateUrl: './api-tasks.html',
  styleUrl: './api-tasks.scss',
  standalone: true
})
export class ApiTasks implements OnInit{
 

  nuevaTarea = signal('');
  
  tareaEditando: string | number = '';
  
  textoEdicion = signal('');

  private store = inject(Store<AppState>);

  apiTasks$ = this.store.select(selectApiTasks);

  ngOnInit() {
    this.store.dispatch(loadApiTasks());
  }

  onToggleCompletada(task: Task) {

    const actualizada = {
      ...task,
      completada: !task.completada
    };

    
    this.store.dispatch(
      updateApiTask({
        task: actualizada
      })
    );
  }

  onDelete(id: number | string) {

    this.store.dispatch(
      deleteApiTask({ id })
    );

  }

  crearTarea() {

    const texto = this.nuevaTarea().trim();

    if (!texto) {
      return;
    }

    this.store.dispatch(
      createApiTask({
        titulo: texto
      })
    );

    this.nuevaTarea.set('');

  }

  actualizarTexto(event: Event) {
    const input = event.target as HTMLInputElement;
    this.nuevaTarea.set(input.value);
  }

  onEditar(task: Task) {

    this.tareaEditando = task.id;

    this.textoEdicion.set(
      task.titulo
    );

  }

  guardarEdicion(task: Task) {

    const actualizada = {
      ...task,
      titulo: this.textoEdicion().trim()
    };

    this.store.dispatch(
      updateApiTask({
        task: actualizada
      })
    );

    this.tareaEditando = '';

    this.textoEdicion.set('');

  }
  cancelarEdicion() {

    this.tareaEditando = '';

    this.textoEdicion.set('');

  }
  
}

