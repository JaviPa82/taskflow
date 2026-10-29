import { Injectable, signal, computed } from '@angular/core';
import { Task } from '../models/task.interface';


@Injectable({
  providedIn: 'root'
})

export class TaskService {
    
  constructor() {
      this.cargar();
    }

  private readonly STORAGE_KEY = 'taskflow_tasks';
  private readonly TRASH_KEY  = 'taskflow_trash';

  papelera = signal<Task[]>([]);
  
  totalPapelera = computed(
    () => this.papelera().length
  );
  pendientes = computed(() =>
    this.tareas()
      .filter(t => !t.completada)
      .length
  );

  completadas = computed(() =>
    this.tareas()
      .filter(t => t.completada)
      .length
  );

  tareasPendientes = computed(() =>
    this.tareas()
      .filter(t => !t.completada)
  );

  tareasCompletadas = computed(() =>
    this.tareas()
      .filter(t => t.completada)
  );
  
  tareas = signal<Task[]>([]);

  agregarTarea(texto: string) {

    this.tareas.update(lista => [
      ...lista,
      {
        id: Date.now(),
        titulo: texto,
        completada: false,
        fechaCreacion: new Date().toISOString()
      }
    ]);

    this.guardar();
  }
  eliminarTarea(id: number) {
    const tarea = this.tareas()
    .find(t => t.id === id);

    if (!tarea) {
    return;
    }
     this.papelera.update(lista => [
        ...lista,
        tarea
      ]);


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

    localStorage.setItem(
      this.TRASH_KEY ,
      JSON.stringify(this.papelera())
    );
  }

  private cargar(): void {

    const datos = localStorage.getItem(
      this.STORAGE_KEY
    );

    if (datos) {
      this.tareas.set(
        JSON.parse(datos)
      );
    }

    const datos2 = localStorage.getItem(
      this.TRASH_KEY
    );

    if (datos2) {
      this.papelera.set(
        JSON.parse(datos2)
      );
    }
  }

  restaurarTarea(id: number){

    const tarea = this.papelera()
    .find(t => t.id === id);
    
    if (!tarea) {
    return;
    }

    this.tareas.update(lista => [
      ...lista,
      tarea]);

    this.papelera.update(lista =>
    lista.filter(t => t.id !== id)
    );

    this.guardar();
  }

  eliminarDefinitivamente(id: number){
    this.papelera.update(lista =>
      lista.filter(t => t.id !== id)
    );

    this.guardar();
  }
}