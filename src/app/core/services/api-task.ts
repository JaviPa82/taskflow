import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Task, NuevaTask } from '../models/task.interface'

@Injectable({
  providedIn: 'root'
})
export class ApiTaskService {

  private http = inject(HttpClient);

  getTasks() {
    return this.http.get<Task[]>(
      'http://localhost:3000/taskssss'
    );
  }
  crearTarea(task: NuevaTask) {
    return this.http.post<Task>(
      'http://localhost:3000/tasks',
      task
    );
  }
  actualizarTarea(task: Task) {
    return this.http.put<Task>(
      `http://localhost:3000/tasks/${task.id}`,
      task
    );
  }
  eliminarTarea(id: number|string) {
    return this.http.delete<Task>(
      `http://localhost:3000/tasks/${id}`
    );
  }

  
}