import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskPapelera } from './task-papelera';

describe('TaskPapelera', () => {
  let component: TaskPapelera;
  let fixture: ComponentFixture<TaskPapelera>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskPapelera],
    }).compileComponents();

    fixture = TestBed.createComponent(TaskPapelera);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
