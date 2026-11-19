import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingTasks } from './pending-tasks';

import { provideStore,Store  } from '@ngrx/store';
import { taskReducer } from '../../store/reducers/task.reducer';
import { addTask,toggleTask,moveToTrash } from '../../store/task.actions';


describe('PendingTasks', () => {
  let component: PendingTasks;
  let fixture: ComponentFixture<PendingTasks>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PendingTasks],
      providers: [
        provideStore({
          tasks: taskReducer
        })
      ]
    }).compileComponents();

    fixture =
        TestBed.createComponent(PendingTasks);
    
        component =
          fixture.componentInstance;
    
        fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('debería añadir la tarea Prueba NgRx', () => {

    const store = TestBed.inject(Store);

    const dispatchSpy =
      vi.spyOn(store, 'dispatch');

   
    component.probarNgRx();

    expect(dispatchSpy)
      .toHaveBeenCalledWith(
        addTask({
          title: 'Prueba NgRx'
        })
      );

  });

  it('debería marcar una tarea como completada', () => {
  
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

  it('no debería editar si no existen tareas', () => {

    const store = TestBed.inject(Store);

    const dispatchSpy =
      vi.spyOn(store, 'dispatch');

    component.editarPrimera();

    expect(dispatchSpy)
      .not.toHaveBeenCalled();

  });

});
