import { createReducer, on } from '@ngrx/store';

import { initialState } from '../task.state';
import { addTask, deleteForeverTask, toggleTask, editTask, moveToTrash, restoreTask, loadTasks, loadApiTasksSuccess, createApiTaskSuccess, deleteApiTaskSuccess, updateApiTaskSuccess} from '../task.actions';
import { crearTarea } from '../../../../testing/factories/task.factory'

const tarea = crearTarea();
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

       tarea
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

        })),

    on(loadApiTasksSuccess,
        (state, { tasks }) => ({

            ...state,

            apiTasks: tasks

        })),
    on(createApiTaskSuccess,
        (state, { task }) => ({

            ...state,

            apiTasks: [
            task,
            ...state.apiTasks
            ]

        })),
    on(deleteApiTaskSuccess,
        (state, { id }) => ({

            ...state,

            apiTasks: state.apiTasks.filter(
            task => task.id !== id
            )

        })),

    on(updateApiTaskSuccess,
        (state, { task }) => ({

            ...state,

            apiTasks: state.apiTasks.map(
            t => t.id === task.id
                ? task
                : t
            )

        }))


  
);


