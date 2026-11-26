import { Component,inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';


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

    this.taskForm.valueChanges
      .subscribe(value => {

        console.log(value);

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