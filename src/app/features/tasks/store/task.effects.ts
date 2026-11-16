import { Injectable, inject } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';

import { tap,switchMap, map, catchError, of } from 'rxjs';

import { addTask, editTask, moveToTrash, restoreTask, toggleTask, loadApiTasks, loadApiTasksSuccess, loadApiTasksFailure, createApiTask, createApiTaskSuccess, createApiTaskFailure, deleteApiTask, deleteApiTaskFailure, deleteApiTaskSuccess,updateApiTask, updateApiTaskSuccess, updateApiTaskFailure } from './task.actions';

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

  createApiTask$ = createEffect(() =>
    this.actions$.pipe(

        ofType(createApiTask),

        switchMap(({ titulo }) =>

        this.apiTaskService
            .crearTarea({

            titulo,

            completada: false,

            fechaCreacion:
                new Date().toISOString()

            })
            .pipe(

                map(task =>
                    createApiTaskSuccess({
                    task
                })
                ),

                catchError(error =>
                    of(
                        createApiTaskFailure({
                            error: error.message
                        })
                    )
                )

            )

        )

    )
  );

  deleteApiTask$ = createEffect(() =>
    this.actions$.pipe(

        ofType(deleteApiTask),

        switchMap(({ id }) =>

        this.apiTaskService
            .eliminarTarea(id)
            .pipe(

            map(() =>
                deleteApiTaskSuccess({
                id
                })
            ),

            catchError(error =>
                of(
                deleteApiTaskFailure({
                    error: error.message
                })
                )
            )

            )

        )

    )
  );

  updateApiTask$ = createEffect(() =>
    this.actions$.pipe(

        ofType(updateApiTask),

        switchMap(({ task }) =>

        this.apiTaskService
            .actualizarTarea(task)
            .pipe(

            map(taskActualizada =>
                updateApiTaskSuccess({
                task: taskActualizada
                })
            ),

            catchError(error =>
                of(
                updateApiTaskFailure({
                    error: error.message
                })
                )
            )

            )

        )

    )
  );


  
}