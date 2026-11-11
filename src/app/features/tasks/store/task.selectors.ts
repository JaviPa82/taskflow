import { createFeatureSelector, createSelector } from '@ngrx/store';

import { TaskState } from './task.state';

export const selectTaskState =
  createFeatureSelector<TaskState>('tasks');

export const selectTasks =
  createSelector(
    selectTaskState,
    state => state.tasks
  );

  export const selectCompletedTasks =
  createSelector(
    selectTasks,
    tasks =>
      tasks.filter(
        t => t.completada
      )
  );
  export const selectPendingTasks =
  createSelector(
    selectTasks,
    tasks =>
      tasks.filter(
        t => !t.completada
      )
  );

  export const selectTotalCount =
  createSelector(
    selectTasks,
    tasks => tasks.length
  );

export const selectPendingCount =
  createSelector(
    selectPendingTasks,
    tasks => tasks.length
  );

export const selectCompletedCount =
  createSelector(
    selectCompletedTasks,
    tasks => tasks.length
  );

export const selectTrash =
  createSelector(
    selectTaskState,
    state => state.trash
  );
  
export const selectTrashCount =
  createSelector(
    selectTrash,
    trash => trash.length
  );