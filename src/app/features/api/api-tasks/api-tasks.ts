import { Component, inject, OnInit, ChangeDetectorRef,signal} from '@angular/core';
import { ApiTaskService } from '../../../core/services/api-task'
import { Task } from '../../../core/models/task.interface'
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-api-tasks',
  imports: [ CommonModule ],
  templateUrl: './api-tasks.html',
  styleUrl: './api-tasks.scss',
  standalone: true
})
export class ApiTasks implements OnInit{
  cdr = inject(ChangeDetectorRef);
  apiTaskService = inject(ApiTaskService);
  nuevaTarea = signal('');
  tasks: Task[] = [];
  tareaEditando: string | number = '';
  textoEdicion = signal('');

  ngOnInit() {
    this.cargarTareas();
  }

  onToggleCompletada(task: Task) {

    const actualizada = {
      ...task,
      completada: !task.completada
    };

    
    this.apiTaskService
      .actualizarTarea(actualizada)
      .subscribe((resultado) => {
        this.cargarTareas();

    });
  }

  onDelete(id: number | string) {

    this.apiTaskService
      .eliminarTarea(id)
      .subscribe(() => {

      this.cargarTareas();

      });
  }

  crearTarea(){

    const texto = this.nuevaTarea().trim();

    if (!texto) {
      return;
    }

    this.nuevaTarea.set('');

    this.apiTaskService
      .crearTarea({
        titulo: texto,
        completada: false,
        fechaCreacion: new Date().toISOString()
      })
      .subscribe(resultado => {

        this.cargarTareas();

      });
  }

  actualizarTexto(event: Event) {
    const input = event.target as HTMLInputElement;
    this.nuevaTarea.set(input.value);
  }

  onEditar(task: Task) {

    this.tareaEditando = task.id;

    this.textoEdicion.set(
      task.titulo
    );

  }

  guardarEdicion(task: Task) {

  const actualizada = {
    ...task,
    titulo: this.textoEdicion().trim()
  };

  this.apiTaskService
    .actualizarTarea(actualizada)
    .subscribe(() => {

      this.tareaEditando = '';

      this.cargarTareas();

    });

  }
  cancelarEdicion() {

    this.tareaEditando = '';

    this.textoEdicion.set('');

  }
  cargarTareas() {

    this.apiTaskService
      .getTasks()
      .subscribe(tasks => {

        tasks.sort(
          (a, b) =>
            b.fechaCreacion.localeCompare(
              a.fechaCreacion
            )
        );

        this.tasks = [...tasks];

        this.cdr.detectChanges();

      });

  }
}

