import { Task } from '../../../core/models/task.interface';

export interface TaskState {
  tasks: Task[];
}

export interface AppState {
  tasks: TaskState;
}

export const initialState: TaskState = {
  tasks: []
};