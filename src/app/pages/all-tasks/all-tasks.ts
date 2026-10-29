import { Component, computed, inject, input, signal } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { TaskList } from '../../components/task-list/task-list';


@Component({
  selector: 'app-all-tasks',
  imports: [ TaskList] ,
  templateUrl: './all-tasks.html',
  styleUrl: './all-tasks.scss',
})
export class AllTasks {

taskService = inject(TaskService);
nuevaTarea = signal('');
tareaSeleccionada = signal<number | null>(null);

  onEliminarTarea(id: number) {

    this.taskService.eliminarTarea(id);
  
  }

  onToggleCompletada(id: number) {

    this.taskService.toggleCompletada(id);

  }

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
  onEditarTareaSeleccionada(id: number) {

    this.tareaSeleccionada.set(id);

  }

  onRestaurarTarea(id: number) {

    this.taskService.restaurarTarea(id);

  }

  onEliminarDefinitivamente(id: number) {

    this.taskService.eliminarDefinitivamente(id);

  }
 
}
