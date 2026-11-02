import { Component, computed, inject, input, signal } from '@angular/core';
import { TaskService } from '../../../../core/services/task.service';
import { TaskList } from '../../components/task-list/task-list';
import { ApiTaskService } from '../../../../core/services/api-task';
import { Task } from '../../../../core/models/task.interface'


@Component({
  selector: 'app-all-tasks',
  imports: [ TaskList] ,
  templateUrl: './all-tasks.html',
  styleUrl: './all-tasks.scss',
})
export class AllTasks {

tareasApi: Task[] = [];
taskService = inject(TaskService);
nuevaTarea = signal('');
tareaSeleccionada = signal<number | null>(null);

apiTaskService = inject(ApiTaskService);

ngOnInit() {
  this.apiTaskService
    .getTasks()
    .subscribe(tareas  => {
      this.tareasApi = tareas;
    });
}

  nuevaTareaAPI() {

    /*const tarea = {
      titulo: 'Aprender POST',
      completada: false,
      fechaCreacion: new Date().toISOString()
    };*/
    const texto = this.nuevaTarea().trim();

    if (!texto) {
      return;
    }

    this.taskService.agregarTarea(texto);

    this.nuevaTarea.set('');

    this.apiTaskService
      .crearTarea({
        titulo: texto,
        completada: false,
        fechaCreacion: new Date().toISOString()
      })
      .subscribe(resultado => {

        console.log('Creada:', resultado);

      });
  }

  /*actualizarTareaAPI() {

  const tareaActualizada = {
    id: 1,
    titulo: 'Aprender PUT',
    completada: true,
    fechaCreacion: '2026-10-29T10:00:00.000Z'
  };

  this.apiTaskService
    .actualizarTarea(tareaActualizada)
    .subscribe(resultado => {

      console.log('Actualizada:', resultado);

    });

  }*/

  onEliminarTarea(id: number) {

    this.taskService.eliminarTarea(id);
  
  }

  onToggleCompletada(id: number) {

    //this.taskService.toggleCompletada(id);

    const tarea =
    this.tareasApi.find(t => t.id === id)
    
    if (!tarea) {
      return;
    }

    this.apiTaskService
    .actualizarTarea(tarea)
    .subscribe(resultado => {

      console.log('Actualizada:', resultado);

    });

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
