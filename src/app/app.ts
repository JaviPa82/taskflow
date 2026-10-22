import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.html'
})
export class App {

  nuevaTarea = signal('');

  tareas = signal([
    'Angular',
    'Signals',
    'TaskFlow',
    'Azure',
    'API'
  ]);

  tareasLog = signal([ ...this.tareas() ])
  
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
      texto
    ]);

    this.nuevaTarea.set('');
    this.mostrarSoloA();
  }

  eliminarTarea(indice: number) {

    this.tareas.update(lista =>
      lista.filter((_, i) => i !== indice)
    );

  }

  limpiarVacias(){
    this.tareas.update(lista =>
      lista.filter((valor, _) => valor.trim() !== '')
    );
  }

  mostrarSoloA(){
    
    const log = this.tareas()
      .filter( tareaLog => tareaLog.startsWith('A'));
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

}