import { Component, inject, signal } from '@angular/core';

import { TaskList } from '../../components/task-list/task-list';


import { toSignal } from '@angular/core/rxjs-interop';


import { Store } from '@ngrx/store';
import { AppState } from '../../store/task.state';
import { addTask,editTask,deleteForeverTask,moveToTrash,restoreTask,toggleTask } from '../../store/task.actions';
import { selectTasks,selectTrash } from '../../store/selectors/task.selectors';


@Component({
  selector: 'app-all-tasks',
  imports: [ TaskList] ,
  templateUrl: './all-tasks.html',
  styleUrl: './all-tasks.scss',
})
export class AllTasks {

private store = inject(Store<AppState>);

nuevaTarea = signal('');
tareaSeleccionada = signal<number | string | null>(null);


tareasNgRx = toSignal(
  this.store.select(selectTasks),
  {
    initialValue: []
  }
);
trash$ = this.store.select(selectTrash);

trashNgRx = toSignal(
  this.store.select(selectTrash),
  {
    initialValue: []
  }
);


  onEliminarTarea(id: number | string) {

    //this.taskService.eliminarTarea(id);
    this.store.dispatch(
      moveToTrash({ id })
    );
  }

  actualizarTexto(event: Event) {
    const input = event.target as HTMLInputElement;
    this.nuevaTarea.set(input.value);
  }

  onAgregarTarea() {

    const texto = this.nuevaTarea().trim();

    if (!texto) {
      return;
    }

    this.store.dispatch(
      addTask({
        title: texto
      })
    );


    this.nuevaTarea.set('');

  }
  onGuardarEdicion() {

    const id = this.tareaSeleccionada();

    if (id === null) {
      return;
    }

    const texto = this.nuevaTarea().trim();

    if (!texto) {
      return;
    }

    //this.taskService.editarTarea(id, texto);
    this.store.dispatch(editTask({
        id,
        titulo: texto
      })
    );

    this.nuevaTarea.set('');

    this.tareaSeleccionada.set(null);
  }
  onEditarTareaSeleccionada(id: number | string) {

    this.tareaSeleccionada.set(id);

  }

  onRestaurarTarea(id: number| string) {

    //this.taskService.restaurarTarea(id);
    this.store.dispatch(
      restoreTask({ id })
    );

  }

  onEliminarDefinitivamente(id: number | string) {

    this.store.dispatch(deleteForeverTask({ id }));

  }
  
  onToggleCompletada(id: number | string) {

  this.store.dispatch(
    toggleTask({ id })
  );

}
}
