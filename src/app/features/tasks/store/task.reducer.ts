import { createReducer, on } from '@ngrx/store';

import { initialState } from './task.state';
import { addTask, deleteForeverTask, toggleTask, editTask, moveToTrash, restoreTask, loadTasks} from './task.actions';

export const taskReducer = createReducer(
    initialState,

    on(loadTasks, (state, { tasks, trash }) => ({
        ...state,
        tasks,
        trash
    })),

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
    on(moveToTrash, (state, { id }) => {

        const task =
            state.tasks.find(
            t => t.id === id
            );

        if (!task) {
            return state;
        }

        return {

            ...state,

            tasks:
            state.tasks.filter(
                t => t.id !== id
            ),

            trash: [
            ...state.trash,
            task
            ]

        };

        }),
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
    })),
    on(restoreTask, (state, { id }) => {

        const task =
            state.trash.find(
            t => t.id === id
            );

        if (!task) {
            return state;
        }

        return {

            ...state,

            tasks: [
            ...state.tasks,
            task
            ],

            trash:
            state.trash.filter(
                t => t.id !== id
            )

        };

    }),
    on(deleteForeverTask,
        (state, { id }) => ({

            ...state,

            trash: state.trash.filter(
            t => t.id !== id
            )

        }))

  
);


