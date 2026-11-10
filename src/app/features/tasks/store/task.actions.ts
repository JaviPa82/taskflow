import { createAction, props } from '@ngrx/store';

export const addTask = createAction(
  '[Tasks] Add Task',
  props<{ title: string }>()
);

export const deleteTask = createAction(
  '[Tasks] Delete Task',
  props<{ id: number | string }>()
);

export const toggleTask = createAction(
  '[Tasks] Toggle Task',
  props<{ id: number | string }>()
);

export const editTask = createAction(
  '[Tasks] Edit Task',
  props<{
    id: number | string;
    titulo: string;
  }>()
);