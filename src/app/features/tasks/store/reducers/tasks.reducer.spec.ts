import { taskReducer } from './task.reducer';
import { initialState } from '../task.state';
import { restoreTask,deleteForeverTask, moveToTrash, addTask, toggleTask,editTask} from '../task.actions';

import { crearTarea } from '../../../../testing/factories/task.factory'

describe('TasksReducer', () => {
  const tarea = crearTarea();
  it('debería crearse', () => {
    expect(taskReducer).toBeTruthy();
  });

  it('debería añadir una tarea', () => {

    const action = addTask({
      title: 'Aprender Testing'
    });

    const state =
      taskReducer(initialState, action);

    expect(state.tasks.length)
      .toBe(1);

  });

  it('debería mover una tarea a la papelera', () => {

    const stateWithTask = {
      ...initialState,

      tasks: [
        tarea
      ]
    };

    const action = moveToTrash({
      id: 1
    });

    const state =
      taskReducer(stateWithTask, action);

    expect(state.tasks.length)
      .toBe(0);

    expect(state.trash.length)
      .toBe(1);

    expect(state.trash[0].titulo)
      .toBe('Angular');

  });

  it('debería restaurar una tarea', () => {

    const stateWithTrash = {

      ...initialState,

      trash: [
        tarea
      ]

    };

    const action = restoreTask({
      id: 1
    });

    const state =
      taskReducer(stateWithTrash, action);

    expect(state.tasks.length)
      .toBe(1);

    expect(state.trash.length)
      .toBe(0);

    expect(state.tasks[0].titulo)
      .toBe('Angular');

  });

  it('debería eliminar una tarea definitivamente', () => {
    const stateWithTrash = {

      ...initialState,

      trash: [
        tarea
      ]

    };
    const action = deleteForeverTask({
      id: 1
    });

    const state =
      taskReducer(stateWithTrash, action);

    expect(state.trash.length)
      .toBe(0);

  });

  it('debería marcar una tarea como completada', () => {
    const stateWithTash = {

      ...initialState,

      tasks: [
        tarea
      ]

    };
    const action = toggleTask({
      id: 1
    });

    const state =
      taskReducer(stateWithTash, action);

    expect(state.tasks[0].completada)
      .toBe(true);

    expect(state.tasks.length)
      .toBe(1);

  });

  it('debería editar el título de una tarea', () => {
    const stateWithTash = {

      ...initialState,

      tasks: [
        tarea
      ]

    };
    const action = editTask({
      id: 1,
      titulo:'Angular Nuevo'
    });

    const state =
      taskReducer(stateWithTash, action);

    expect(state.tasks[0].titulo)
      .toBe('Angular Nuevo');

    expect(state.tasks.length)
      .toBe(1);

  });

});