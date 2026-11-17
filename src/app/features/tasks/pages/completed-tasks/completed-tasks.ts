import { Component, computed, inject,signal } from '@angular/core';
import { TaskList } from '../../components/task-list/task-list';
import { Store } from '@ngrx/store';

import { toggleTask, moveToTrash } from '../../store/task.actions';

import { selectCompletedTasks } from '../../store/selectors/task.selectors';

import { AppState } from '../../store/task.state';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-completed-tasks',
  standalone: true,
  imports: [ TaskList, AsyncPipe],
  templateUrl: './completed-tasks.html',
  styleUrl: './completed-tasks.scss',
})

export class CompletedTasks {

  private store = inject(Store<AppState>);

  tareasCompletadas =
    this.store.select(selectCompletedTasks);

  onEliminarTarea(id: number | string) {

    this.store.dispatch(
      moveToTrash({ id })
    );

  }

  onToggleCompletada(id: number | string) {

    this.store.dispatch(
      toggleTask({ id })
    );

  }

}
