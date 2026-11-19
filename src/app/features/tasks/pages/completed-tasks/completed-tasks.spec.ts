import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompletedTasks } from './completed-tasks';

import { provideStore,Store  } from '@ngrx/store';
import { taskReducer } from '../../store/reducers/task.reducer';

import { moveToTrash, toggleTask } from '../../store/task.actions';

describe('CompletedTasks', () => {
  let component: CompletedTasks;
  let fixture: ComponentFixture<CompletedTasks>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompletedTasks],
      providers: [
        provideStore({
          tasks: taskReducer
        })
      ]
    }).compileComponents();

    fixture =
        TestBed.createComponent(CompletedTasks);
    
        component =
          fixture.componentInstance;
    
        fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('debería marcar una tarea como pendiente', () => {
  
    const store = TestBed.inject(Store);

    const dispatchSpy =
      vi.spyOn(store, 'dispatch');

    component.onToggleCompletada(1);

    expect(dispatchSpy)
      .toHaveBeenCalledWith(
        toggleTask({
          id: 1
        })
      );

  });

  it('debería mover una tarea a la papelera', () => {
  
    const store = TestBed.inject(Store);

    const dispatchSpy =
      vi.spyOn(store, 'dispatch');

    component.onEliminarTarea(1);

    expect(dispatchSpy).toHaveBeenCalledWith(
      moveToTrash({
        id: 1
      })
    );

  });

});
