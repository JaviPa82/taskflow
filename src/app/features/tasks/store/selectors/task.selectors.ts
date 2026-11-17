import { createFeatureSelector, createSelector } from '@ngrx/store';

import { TaskState } from '../task.state';

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

  export const selectApiTasks =
  createSelector(
    selectTaskState,
    state => state.apiTasks
  );

  export const selectApiCompletedTasks =
  createSelector(
    selectApiTasks,
    tasks =>
      tasks.filter(
        t => t.completada
      )
  );

export const selectApiPendingTasks =
  createSelector(
    selectApiTasks,
    tasks =>
      tasks.filter(
        t => !t.completada
      )
  );

export const selectApiTotalCount =
  createSelector(
    selectApiTasks,
    tasks => tasks.length
  );

export const selectApiCompletedCount =
  createSelector(
    selectApiCompletedTasks,
    tasks => tasks.length
  );

export const selectApiPendingCount =
  createSelector(
    selectApiPendingTasks,
    tasks => tasks.length
  );
  
export const selectApiCompletionPercentage =
  createSelector(

    selectApiTotalCount,
    selectApiCompletedCount,

    (total, completadas) =>

      total === 0
        ? 0
        : Math.round(
            completadas * 100 / total
          )

  );