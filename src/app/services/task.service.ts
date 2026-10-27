import { Injectable, signal } from '@angular/core';
import { Task } from '../models/task.interface';

@Injectable({
  providedIn: 'root'
})

export class TaskService {

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
}