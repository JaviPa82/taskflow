import { Component, inject } from '@angular/core';
import { AuthService } from '../../../../core/services/auth';
import { TaskList } from '../../components/task-list/task-list';
import { AsyncPipe } from '@angular/common';

import { Store } from '@ngrx/store';

import {
  addTask,
  deleteForeverTask,
  toggleTask,
  editTask,
  moveToTrash
} from '../../store/task.actions';

import {
  selectTasks,
  selectCompletedTasks,
  selectPendingTasks,
  selectTotalCount,
  selectPendingCount,
  selectCompletedCount
} from '../../store/selectors/task.selectors';

import { AppState } from '../../store/task.state';

import { take } from 'rxjs';

@Component({
  selector: 'app-pending-tasks',
  standalone: true,
  imports: [
    TaskList,
    AsyncPipe
  ],
  templateUrl: './pending-tasks.html',
})
export class PendingTasks {

  private store = inject(Store<AppState>);

  authService = inject(AuthService);

  totalCount$ = this.store.select(selectTotalCount);
  pendingCount$ = this.store.select(selectPendingCount);
  completedCount$ = this.store.select(selectCompletedCount);

  tasks$ = this.store.select(selectTasks);
  pendingTasks$ = this.store.select(selectPendingTasks);
  completedTasks$ = this.store.select(selectCompletedTasks);

  probarNgRx() {
    this.store.dispatch(
      addTask({
        title: 'Prueba NgRx'
      })
    );
  }

  onToggleCompletada(id: number | string) {

    this.store.dispatch(
      toggleTask({ id })
    );

  }

  onEliminarTarea(id: number | string) {

    this.store.dispatch(
      moveToTrash({ id })
    );

  }

  borrarPrimera() {

    this.store
      .select(selectTasks)
      .pipe(take(1))
      .subscribe(tasks => {

        if (tasks.length > 0) {

          this.store.dispatch(
            deleteForeverTask({
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