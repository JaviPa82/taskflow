import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllTasks } from './all-tasks';

import { provideStore,Store  } from '@ngrx/store';
import { taskReducer } from '../../store/reducers/task.reducer';
import { moveToTrash,toggleTask,restoreTask,deleteForeverTask,addTask,editTask} from '../../store/task.actions';

describe('AllTasks', () => {
  let component: AllTasks;
  let fixture: ComponentFixture<AllTasks>;

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      imports: [AllTasks],
      providers: [
        provideStore({
          tasks: taskReducer
        })
      ]
    }).compileComponents();

    fixture =
      TestBed.createComponent(AllTasks);

    component =
      fixture.componentInstance;

    fixture.detectChanges();

  });


  it('should create', () => {
      expect(component).toBeTruthy();
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

  it('debería restaurar una tarea', () => {

    const store = TestBed.inject(Store);

    const dispatchSpy =
      vi.spyOn(store, 'dispatch');

    component.onRestaurarTarea(1);

    expect(dispatchSpy)
      .toHaveBeenCalledWith(
        restoreTask({
          id: 1
        })
      );

  });

  it('debería eliminar definitivamente una tarea', () => {

    const store = TestBed.inject(Store);

    const dispatchSpy =
      vi.spyOn(store, 'dispatch');

    component.onEliminarDefinitivamente(1);

    expect(dispatchSpy)
      .toHaveBeenCalledWith(
        deleteForeverTask({
          id: 1
        })
      );

  });

  it('debería añadir una tarea', () => {

    const store = TestBed.inject(Store);

    const dispatchSpy =
      vi.spyOn(store, 'dispatch');

    component.nuevaTarea.set(
      'Aprender Testing'
    );

    component.onAgregarTarea();

    expect(dispatchSpy)
      .toHaveBeenCalledWith(
        addTask({
          title: 'Aprender Testing'
        })
      );

  });

  it('no debería añadir una tarea vacía', () => {

    const store = TestBed.inject(Store);

    const dispatchSpy =
      vi.spyOn(store, 'dispatch');

    component.nuevaTarea.set(
      '     '
    );

    component.onAgregarTarea();

    expect(dispatchSpy)
      .not.toHaveBeenCalled();

  });

  it('debería guardar una tarea modificada', () => {

    const store = TestBed.inject(Store);

    const dispatchSpy =
      vi.spyOn(store, 'dispatch');

    component.tareaSeleccionada.set(1) 
    component.nuevaTarea.set(
      "Angular Moderno"
    );
    component.onGuardarEdicion();

    expect(dispatchSpy)
      .toHaveBeenCalledWith(
        editTask({
          id: 1,
          titulo: "Angular Moderno"
        })
      );

  });

  it('No debería guardar la tarea modificada porque no tiene id', () => {

    const store = TestBed.inject(Store);

    const dispatchSpy =
      vi.spyOn(store, 'dispatch');

    component.tareaSeleccionada.set(null) 
  
    component.onGuardarEdicion();

    expect(dispatchSpy)
      .not.toHaveBeenCalled();

  });

  it('No debería guardar la tarea modificada porque no tiene texto la tarea', () => {

    const store = TestBed.inject(Store);

    const dispatchSpy =
      vi.spyOn(store, 'dispatch');

    component.tareaSeleccionada.set(1) 
    component.nuevaTarea.set(
      "      "
    );
    component.onGuardarEdicion();

     expect(dispatchSpy)
      .not.toHaveBeenCalled();

  });

});
