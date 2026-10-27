import { Injectable, signal } from '@angular/core';
import { Task } from '../models/task.interface';

@Injectable({
  providedIn: 'root'
})

export class TaskService {

    tareas = signal<Task[]>([
    {
      id: 1,
      titulo: 'HTML',
      completada: false
    },
    {
      id: 2,
      titulo: 'Aprender Angular',
      completada: false
    },
    {
      id: 3,
      titulo: 'CSS',
      completada: false
    },
    {
      id: 4,
      titulo: 'Practicar Signals',
      completada: false
    }
  ]);

  agregarTarea(texto: string) {

    this.tareas.update(lista => [
      ...lista,
      {
        id: Date.now(),
        titulo: texto,
        completada: false
      }
    ]);

  }
  eliminarTarea(id: number) {

    this.tareas.update(lista =>
      lista.filter(t => t.id !== id)
    );

  }

  toggleCompletada (id: number) {

    this.tareas.update(lista =>
      lista.map(tarea =>
        tarea.id === id
          ? {
              ...tarea,
              completada: !tarea.completada
            }
          : tarea
      )
    );
  }

  editarTarea (id: number, nuevoTitulo: string) {

    this.tareas.update(lista =>
      lista.map(tarea =>
        tarea.id === id
          ? {
              ...tarea,
              titulo: nuevoTitulo
            }
          : tarea
      )
    );

  }

}