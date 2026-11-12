import { Injectable, inject } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';

import { tap,switchMap, map, catchError, of } from 'rxjs';

import { addTask, editTask, moveToTrash, restoreTask, toggleTask, loadApiTasks, loadApiTasksSuccess, loadApiTasksFailure } from './task.actions';

import { Store } from '@ngrx/store';

import { selectTaskState } from './task.selectors';
import { take } from 'rxjs';

import { ApiTaskService } from '../../../core/services/api-task';

@Injectable()
export class TaskEffects {

  private actions$ = inject(Actions);
  private store = inject(Store);
  private apiTaskService = inject(ApiTaskService);

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

  loadApiTasks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadApiTasks),

      switchMap(() =>

        this.apiTaskService
            .getTasks()
            .pipe(

                map(tasks =>
                    loadApiTasksSuccess({
                    tasks
                    })
                ),

                catchError(error =>
                    of(
                        loadApiTasksFailure({
                            error: error.message
                        })
                    )
                )

            )

      )

  )

);

}