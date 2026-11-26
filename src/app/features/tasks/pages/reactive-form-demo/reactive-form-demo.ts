import { Component,inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { debounceTime, distinctUntilChanged, map, switchMap, of } from 'rxjs';


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

  taskForm = this.fb.group({

    titulo: [

      '',

      [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50)
      ]

    ]

  });
  constructor() {

    this.taskForm.valueChanges.pipe(

      map(value => value.titulo ?? ''),

      debounceTime(1000),

      distinctUntilChanged(),

      switchMap(texto => {

        console.log(
          'Consultando:',
          texto
        );

        return of({
          texto,
          longitud: texto.length
        });

      })

    ).subscribe(resultado => {

      console.log(resultado);

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