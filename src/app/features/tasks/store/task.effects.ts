import { Injectable, inject } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';

import { tap } from 'rxjs';

import { addTask, editTask, moveToTrash, restoreTask, toggleTask } from './task.actions';

import { Store } from '@ngrx/store';

import { selectTaskState } from './task.selectors';
import { take } from 'rxjs';

@Injectable()
export class TaskEffects {

  private actions$ = inject(Actions);
  private store = inject(Store);

  guardarLocalStorage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        addTask,
        editTask,
        moveToTrash,
        restoreTask,
        toggleTask
      ),
      tap(() => {
        this.store
            .select(selectTaskState)
            .pipe(take(1))
            .subscribe(state => {

                localStorage.setItem(
                    'taskflow_tasks',
                    JSON.stringify(state.tasks)
                );

                localStorage.setItem(
                    'taskflow_trash',
                    JSON.stringify(state.trash)
                );

            });
        })
    ), 
    { dispatch: false });

}