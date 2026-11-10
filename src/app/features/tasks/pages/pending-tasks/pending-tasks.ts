import { Component, computed, inject, signal } from '@angular/core';
import { TaskService } from '../../../../core/services/task.service';
import { AuthService } from '../../../../core/services/auth';
import { TaskList } from '../../components/task-list/task-list';
import { AsyncPipe } from '@angular/common'

import { Store } from '@ngrx/store';

import { addTask,deleteTask,toggleTask,editTask } from '../../store/task.actions';
import { selectTasks,selectCompletedTasks,selectPendingTasks,selectTotalCount,selectPendingCount,selectCompletedCount } from '../../store/task.selectors';
import { AppState } from '../../store/task.state';

import { take } from 'rxjs';

@Component({
  selector: 'app-pending-tasks',
  standalone: true,
  imports: [TaskList,
           AsyncPipe],
  templateUrl: './pending-tasks.html',
})


export class PendingTasks {

  constructor() {

  }

  //private store = inject(Store);
  private store = inject(Store<AppState>);

  taskService = inject(TaskService);

  authService = inject(AuthService);

  tareasPendientes = this.taskService.tareasPendientes;

  totalCount$ = this.store.select(selectTotalCount);
  pendingCount$ = this.store.select(selectPendingCount);
  completedCount$ = this.store.select(selectCompletedCount);
  tasks$ = this.store.select(selectTasks);
  pendingTasks$ = this.store.select(selectPendingTasks);
  completedTasks$ = this.store.select(selectCompletedTasks);

  agregarPrueba() {
    this.store.dispatch(
      addTask({
        title: 'Primera tarea NgRx'
      })
    );
  }

  probarNgRx() {
    this.store.dispatch(
      addTask({
        title: 'Prueba NgRx'
      })
    );
  }

  onToggleCompletada(id: number | string) {

    this.taskService.toggleCompletada(id);
  }
  
  onEliminarTarea(id: number |string) {

    this.taskService.eliminarTarea(id);
  
  }

  borrarPrimera() {

  this.store
    .select(selectTasks)
    .pipe(take(1))
    .subscribe(tasks => {

      if (tasks.length > 0) {

        this.store.dispatch(
          deleteTask({
            id: tasks[0].id
          })
        );
      }

    });
  
  }
  togglePrimera() {

  this.store
    .select(selectTasks)
    .pipe(take(1))
    .subscribe(tasks => {

      if (tasks.length > 0) {

        this.store.dispatch(
          toggleTask({
            id: tasks[0].id
          })
        );
      }

    });
  }

  editarPrimera() {

    this.tasks$
      .pipe(take(1))
      .subscribe(tasks => {

        if (tasks.length > 0) {

          this.store.dispatch(
            editTask({
              id: tasks[0].id,
              titulo: 'Editada con NgRx'
            })
          );

        }

      });

  }


}