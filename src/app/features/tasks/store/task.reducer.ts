import { createReducer, on } from '@ngrx/store';

import { initialState } from './task.state';
import { addTask, deleteTask, toggleTask, editTask } from './task.actions';

export const taskReducer = createReducer(
    initialState,

    on(addTask, (state, { title }) => ({
        ...state,

        tasks: [
        ...state.tasks,

        {
            id: Date.now(),
            titulo: title,
            completada: false,
            fechaCreacion: new Date().toISOString()
        }
        ]
    })),
    on(deleteTask, (state, { id }) => ({
        ...state,

        tasks: state.tasks.filter(
            task => task.id !== id
        )
    })),
    on(toggleTask, (state, { id }) => ({
        ...state,

        tasks: state.tasks.map(task =>
            task.id === id
            ? {
                ...task,
                completada: !task.completada
                }
            : task
        )
    })),
    on(editTask, (state, { id, titulo }) => ({
    ...state,

    tasks: state.tasks.map(task =>
        task.id === id
        ? {
            ...task,
            titulo
            }
        : task
    )
    }))

  
);


