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

  onAgregarTarea() {

    const texto = this.nuevaTarea().trim();

    if (!texto) {
      return;
    }

    this.taskService.agregarTarea(texto);

    this.nuevaTarea.set('');

  }

  onEliminarTarea(id: number) {

    this.taskService.eliminarTarea(id);
  
  }

  onToggleCompletada(id: number) {

    this.taskService.toggleCompletada(id);

  }


  onEditarTareaSeleccionada(id: number) {

    this.tareaSeleccionada.set(id);

  }

  onGuardarEdicion() {

    const id = this.tareaSeleccionada();

    if (id === null) {
      return;
    }

    const texto = this.nuevaTarea().trim();

    if (!texto) {
      return;
    }

    this.taskService.editarTarea(id, texto);

    this.nuevaTarea.set('');

    this.tareaSeleccionada.set(null);
  }

  onRestaurarTarea(id: number) {

    this.taskService.restaurarTarea(id);

  }

  onEliminarDefinitivamente(id: number) {

    this.taskService.eliminarDefinitivamente(id);

  }
}