import { Component, signal, computed } from '@angular/core';
import { Task } from './task.interface';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.html'
})
export class App {

  nuevaTarea = signal('');

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

  actualizarTexto(event: Event) {
    const input = event.target as HTMLInputElement;
    this.nuevaTarea.set(input.value);
  }

  agregarTarea() {
    const texto = this.nuevaTarea().trim();
    if (!texto) {
      return;
    }
    
    this.tareas.update(lista => [
      ...lista,
      {
        id: Date.now(),
        titulo: texto,
        completada: false
      }
    ]);
    this.nuevaTarea.set('');
  }

  eliminarTarea(id: number) {
    this.tareas.update(lista =>
      lista.filter(tarea => tarea.id !== id)
    );

  }

  toggleCompletada(id: number) {
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
}