import { selectPendingCount,selectCompletedCount, selectTrashCount,selectApiCompletionPercentage } from './task.selectors';

import { crearTarea } from '../../../../testing/factories/task.factory'


describe('TaskSelectors', () => {
    const tarea = crearTarea();
    const tarea1 = crearTarea({
      id:2,
      titulo: 'NgRx', 
      completada: true
    });
    const tarea2 = crearTarea({
      id:3,
      titulo: 'Testing',
      completada: false
    });
    const tarea3 = crearTarea({
      id:4,
      titulo: 'Kracoa',
      completada: false
    });

  it('debería contar tareas pendientes', () => {
    
    const state = {

      tasks: {

        tasks: [
          tarea,
          tarea1,
          tarea2
        ],

        trash: [],
        apiTasks: []

      }

    };

    const result =
      selectPendingCount(state);

    expect(result)
      .toBe(2);

  });

  it('debería contar tareas completadas', () => {

    const state = {

      tasks: {

        tasks: [
          tarea,
          tarea1,
          tarea2
        ],

        trash: [],
        apiTasks: []

      }

    };

    const result =
      selectCompletedCount(state);

    expect(result)
      .toBe(1);

  });

  it('debería contar tareas en la papelera', () => {

    const state = {

      tasks: {

        tasks: [],
        trash: [
            tarea,
            tarea1,
            tarea2
        ],
        apiTasks: []

      }

    };

    const result =
      selectTrashCount(state);

    expect(result)
      .toBe(3);

  });

  it('debería devolver el porcentaje de tareas completadas del API', () => {

    const state = {

      tasks: {

        tasks: [],
        trash: [],
        apiTasks: [tarea,tarea1,tarea2,tarea3]

      }

    };

    const result =
      selectApiCompletionPercentage(state);

    expect(result)
      .toBe(25);

  });

  it('debería devolver 0 si no hay tareas en el API', () => {

    const state = {

      tasks: {

        tasks: [],
        trash: [],
        apiTasks: []

      }

    };

    const result =
      selectApiCompletionPercentage(state);

    expect(result)
      .toBe(0);

  });

});