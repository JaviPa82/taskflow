import { selectPendingCount,selectCompletedCount, selectTrashCount,selectApiCompletionPercentage } from './task.selectors';

describe('TaskSelectors', () => {

  it('debería contar tareas pendientes', () => {

    const state = {

      tasks: {

        tasks: [
          {
            id: 1,
            titulo: 'Angular',
            completada: false,
            fechaCreacion: '2026-01-01'
          },
          {
            id: 2,
            titulo: 'NgRx',
            completada: true,
            fechaCreacion: '2026-01-01'
          },
          {
            id: 3,
            titulo: 'Testing',
            completada: false,
            fechaCreacion: '2026-01-01'
          }
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
          {
            id: 1,
            titulo: 'Angular',
            completada: false,
            fechaCreacion: '2026-01-01'
          },
          {
            id: 2,
            titulo: 'NgRx',
            completada: true,
            fechaCreacion: '2026-01-01'
          },
          {
            id: 3,
            titulo: 'Testing',
            completada: false,
            fechaCreacion: '2026-01-01'
          }
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
            {
            id: 1,
            titulo: 'Angular',
            completada: false,
            fechaCreacion: '2026-01-01'
          },
          {
            id: 2,
            titulo: 'NgRx',
            completada: true,
            fechaCreacion: '2026-01-01'
          },
          {
            id: 3,
            titulo: 'Testing',
            completada: false,
            fechaCreacion: '2026-01-01'
          }
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
        apiTasks: [{
            id: 1,
            titulo: 'Angular',
            completada: false,
            fechaCreacion: '2026-01-01'
          },
          {
            id: 2,
            titulo: 'NgRx',
            completada: true,
            fechaCreacion: '2026-01-01'
          },
          {
            id: 3,
            titulo: 'Testing',
            completada: false,
            fechaCreacion: '2026-01-01'
          },
          {
            id: 4,
            titulo: 'Prueba',
            completada: false,
            fechaCreacion: '2026-01-01'
          }]

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