// task.factory.ts

import { Task } from '../../core/models/task.interface';

export function crearTarea(
  overrides: Partial<Task> = {}
): Task {

  return {

    id: 1,

    titulo: 'Angular',

    completada: false,

    fechaCreacion: '2026-01-01',

    ...overrides

  };

}