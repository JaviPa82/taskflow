import { createAction, props } from '@ngrx/store';
import { Task } from '../../../core/models/task.interface'

export const loadTasks = createAction(
  '[Task] Load Tasks',
  props<{
    tasks: Task[],
    trash: Task[]
  }>()
);

export const addTask = createAction(
  '[Tasks] Add Task',
  props<{ title: string }>()
);

export const deleteForeverTask = createAction(
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

export const moveToTrash = createAction(
  '[Tasks] Move To Trash',
  props<{ id: number | string }>()
);

export const restoreTask = createAction(
  '[Tasks] Restore Task',
  props<{ id: number | string }>()
);

