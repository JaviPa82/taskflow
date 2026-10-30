export interface Task {
  id: number;
  titulo: string;
  completada: boolean;
  fechaCreacion:string;
}

export type NuevaTask = Omit<Task, 'id'>;