import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskPapelera } from './task-papelera';

import { crearTarea } from '../../../../testing/factories/task.factory'

describe('TaskPapelera', () => {
  let component: TaskPapelera;
  let fixture: ComponentFixture<TaskPapelera>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskPapelera],
    }).compileComponents();

    fixture = TestBed.createComponent(TaskPapelera);
    component = fixture.componentInstance;

    fixture.componentRef.setInput('tarea', crearTarea());

fixture.detectChanges();

await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
