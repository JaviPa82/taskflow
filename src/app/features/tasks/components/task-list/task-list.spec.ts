import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskList } from './task-list';

describe('TaskList', () => {
  let component: TaskList;
  let fixture: ComponentFixture<TaskList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskList],
    }).compileComponents();

    fixture = TestBed.createComponent(TaskList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
      expect(component).toBeTruthy();
  });

  it('debería volver a emitir el id al completar una tarea', () => {

    let idEmitido: number | string | undefined;

    component.completadaClick.subscribe(
      id => idEmitido = id
    );

    component.onCompletada(1);

    expect(idEmitido)
      .toBe(1);

  });


  it('debería volver a emitir el id al eliminar', () => {

    let idEmitido: number | string | undefined;

    component.eliminarClick.subscribe(
      id => idEmitido = id
    );

    component.eliminarTarea(1);

    expect(idEmitido)
      .toBe(1);

  });

  it('debería volver a emitir el id al editar', () => {

    let idEmitido: number | string | undefined;

    component.modificarClick.subscribe(
      id => idEmitido = id
    );

    component.editarTarea(1);

    expect(idEmitido)
      .toBe(1);

  });

  it('debería volver a emitir el id al restaurar', () => {

    let idEmitido: number | string | undefined;

    component.restaurarClick.subscribe(
      id => idEmitido = id
    );

    component.restaurarTarea(1);

    expect(idEmitido)
      .toBe(1);

  });

  it('debería volver a emitir el id al eliminar definitivamente', () => {

    let idEmitido: number | string | undefined;

    component.eliminarDefinitivoClick.subscribe(
      id => idEmitido = id
    );

    component.eliminarDefinitivamente(1);

    expect(idEmitido)
      .toBe(1);

  });



});
