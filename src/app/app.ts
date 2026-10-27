import { Component, signal, computed, inject } from '@angular/core';
import { Header } from './components/header/header';
import { Footer } from './components/footer/footer';
import { TaskList } from './components/task-list/task-list';
import { TaskService } from './services/task.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    Header,
    Footer,
    TaskList
  ],
  templateUrl: './app.html'
})
export class App {

  taskService = inject(TaskService);

  nuevaTarea = signal('');

  tareaSeleccionada = signal<number | null>(null);

  pendientes = computed(() =>
    this.taskService.tareas()
      .filter(t => !t.completada)
      .length
  );

  completadas = computed(() =>
    this.taskService.tareas()
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

    this.taskService.tareas.update(lista => [
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

    this.taskService.tareas.update(lista =>
      lista.filter(t => t.id !== id)
    );

  }

  toggleCompletada(id: number) {

    this.taskService.tareas.update(lista =>
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

  editarTarea(id: number, nuevoTitulo: string) {

    this.taskService.tareas.update(lista =>
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

  editarTareaSeleccionada(id: number) {

    this.tareaSeleccionada.set(id);

  }

  guardarEdicion() {

    const id = this.tareaSeleccionada();

    if (id === null) {
      return;
    }

    const texto = this.nuevaTarea().trim();

    if (!texto) {
      return;
    }

    this.editarTarea(id, texto);

    this.nuevaTarea.set('');

    this.tareaSeleccionada.set(null);
  }

}