export interface Task {
  id: number | string;
  titulo: string;
  completada: boolean;
  fechaCreacion:string;
}

export type NuevaTask = Omit<Task, 'id'>;