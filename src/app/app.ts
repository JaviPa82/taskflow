import { Component, signal, computed } from '@angular/core';
import { Task } from './task.interface';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.html'
})
export class App {

  nuevaTarea = signal('');

  tareas = signal<Task[]>([{
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
  }]);

  tareasLog = signal([ ...this.tareas() ])
  
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
    //this.tareasLargasConUpdate();
    this.nuevaTarea.set('');
    this.mostrarSoloA();
    
  }

  eliminarTarea(indice: number) {
    this.tareas.update(lista =>
      lista.filter(tarea => tarea.id !== indice)
    );

  }

  limpiarVacias(){
    this.tareas.update(lista =>
      lista.filter((valor, _) => valor.titulo.trim() !== '')
    );
  }

  mostrarSoloA(){
    
    const log = this.tareas()
      .filter( tareaLog => tareaLog.titulo.startsWith('A'));
    console.log(log);
  }

  eliminarUltimaTarea(){
    const indiceUltimoElemento = this.tareas().length - 1;
    this.tareas.update(lista =>
      lista.filter((_, i) => i < indiceUltimoElemento)
    );
  }

  eliminarPares(){
    this.tareas.update(lista =>
      lista.filter((_, i) => i % 2 !== 0)
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

  tareasLargasConUpdate() {
    this.tareas.update(lista =>
      lista.filter(t => t.titulo.length > 10));
  }
 tareasLargas() {
    return this.tareas()
    .filter(t => t.titulo.length > 10);
  }
}