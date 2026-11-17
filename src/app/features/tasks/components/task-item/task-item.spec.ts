import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskItem } from './task-item';

describe('TaskItem', () => {
  let component: TaskItem;
  let fixture: ComponentFixture<TaskItem>;

  beforeEach(async () => {

  await TestBed.configureTestingModule({
    imports: [TaskItem],
  }).compileComponents();

  fixture = TestBed.createComponent(TaskItem);

  component = fixture.componentInstance;

  fixture.componentRef.setInput(
    'tarea',
    {
      id: 1,
      titulo: 'Angular',
      completada: false,
      fechaCreacion: '2026-01-01'
    }
  );

  fixture.detectChanges();

});

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('debería emitir el id al cambiar estado', () => {

    let idEmitido: number | string | undefined;

    component.completadaClick.subscribe(
      id => idEmitido = id
    );

    component.cambiarEstado();

    expect(idEmitido)
      .toBe(1);

  });

  it('debería emitir el id al eliminar', () => {

    let idEmitido: number | string | undefined;

    component.eliminarClick.subscribe(
      id => idEmitido = id
    );

    component.eliminar();

    expect(idEmitido)
      .toBe(1);

  });


  it('debería emitir el id al modificar', () => {

    let idEmitido: number | string | undefined;

    component.modificarClick.subscribe(
      id => idEmitido = id
    );

    component.modificar();

    expect(idEmitido)
      .toBe(1);

  });
});
