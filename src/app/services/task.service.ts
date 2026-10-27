import { Injectable, signal } from '@angular/core';
import { Task } from '../models/task.interface';


@Injectable({
  providedIn: 'root'
})

export class TaskService {
    
    constructor() {
        this.cargar();
      }

    private readonly STORAGE_KEY = 'taskflow_tasks';

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

    this.guardar();
  }
  eliminarTarea(id: number) {

    this.tareas.update(lista =>
      lista.filter(t => t.id !== id)
    );

    this.guardar();
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

    this.guardar();

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

    this.guardar();
    
  }

  private guardar(): void {
    localStorage.setItem(
      this.STORAGE_KEY,
      JSON.stringify(this.tareas())
    );
  }

  private cargar(): void {
    const datos = localStorage.getItem(
      this.STORAGE_KEY
    );

    if (!datos) {
      return;
    }

    this.tareas.set(
      JSON.parse(datos)
    );
  }

}