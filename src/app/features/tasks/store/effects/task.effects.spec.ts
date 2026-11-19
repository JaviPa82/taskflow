import { TestBed } from '@angular/core/testing';

import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';

import { TaskEffects } from './task.effects';
import { taskReducer } from '../reducers/task.reducer';

import { addTask } from '../task.actions';

describe('TaskEffects', () => {

  let effects: TaskEffects;

  beforeEach(() => {

    TestBed.configureTestingModule({

      providers: [

        provideStore({
          tasks: taskReducer
        }),

        provideEffects(
          TaskEffects
        )

      ]

    });

    effects =
      TestBed.inject(TaskEffects);

  });

  it('should create', () => {

    expect(effects)
      .toBeTruthy();

  });

  it('debería guardar datos en localStorage', () => {

    const setItemSpy =
        vi.spyOn(
        Storage.prototype,
        'setItem'
        );

    localStorage.setItem(
        'taskflow_tasks',
        '[]'
    );

    expect(setItemSpy)
        .toHaveBeenCalled();

  });

});