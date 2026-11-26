import { Component,inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { debounceTime, distinctUntilChanged, map, switchMap, of } from 'rxjs';

import { ApiTaskService } from '../../../../core/services/api-task';
import { Task } from '../../../../core/models/task.interface';
import { AbstractControl, ValidationErrors } from '@angular/forms';


@Component({
  selector: 'app-reactive-form-demo',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './reactive-form-demo.html',
  styleUrl: './reactive-form-demo.scss'
})


export class ReactiveFormDemo {
  private fb = inject(FormBuilder);
  private apiTaskService = inject(ApiTaskService);
  resultados: Task[] = [];
  
  taskForm = this.fb.group({

    titulo: [

      '',

      [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50),
        tituloProhibidoValidator
      ]

    ]

  });

  registroForm = this.fb.group(
  {
    password: [
      '',
      Validators.required
    ],

    confirmPassword: [
      '',
      Validators.required
    ]
  },

  {
    validators:
      passwordsCoincidenValidator
  }
);
  constructor() {
    
    this.taskForm.valueChanges.pipe(

      map(value => value.titulo ?? ''),

      debounceTime(1000),

      distinctUntilChanged(),

      switchMap(texto =>

      this.apiTaskService
          .getTasks()
          .pipe(

            map(tasks =>

              tasks.filter(task =>
                task.titulo
                    .toLowerCase()
                    .includes(
                        texto.toLowerCase()
                    )
              )

            )

          )

      )

    ).subscribe(tasks => {
        
        this.resultados = tasks;

      });

  }

  onSubmit() {

    if (this.taskForm.invalid) {
      return;
    }

    console.log(
      this.taskForm.value
    );

  }

  
}
export function tituloProhibidoValidator( control: AbstractControl ): ValidationErrors | null {

  const prohibidos = [
    'admin',
    'test',
    '123'
  ];

  const texto = control.value?.toLowerCase();

  if ( prohibidos.includes(texto) ) {

    return {
      tituloProhibido: true
    };

  }

  return null;
}

export function passwordsCoincidenValidator( control: AbstractControl ): ValidationErrors | null {

  const password =
    control.get('password')
      ?.value;

  const confirmPassword =
    control.get('confirmPassword')
      ?.value;

  if (
    password !== confirmPassword
  ) {

    return {
      passwordsDistintas: true
    };

  }

  return null;
}