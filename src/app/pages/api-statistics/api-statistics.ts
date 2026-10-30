import { Component, inject, OnInit } from '@angular/core';
import { ApiTaskService } from '../../services/api-task';
import { ChangeDetectorRef } from '@angular/core';


@Component({
  selector: 'app-api-statistics',
  standalone: true,
  templateUrl: './api-statistics.html'
})
export class ApiStatistics implements OnInit {

  apiTaskService = inject(ApiTaskService);

  total = 0;
  completadas = 0;
  pendientes = 0;
  porcentaje = 0;
  cdr = inject(ChangeDetectorRef);

  ngOnInit() {
    this.cargarEstadisticas();
  }

  cargarEstadisticas() {

  this.apiTaskService
    .getTasks()
    .subscribe(tasks => {
      console.log('TASKS API STATS', tasks);
      this.total = tasks.length;

      this.completadas =
        tasks.filter(
          t => t.completada
        ).length;

      this.pendientes =
        tasks.filter(
          t => !t.completada
        ).length;

      this.porcentaje =
        this.total === 0
          ? 0
          : Math.round(
              this.completadas
              * 100
              / this.total
            );
        this.cdr.detectChanges();       
    });

  }
}