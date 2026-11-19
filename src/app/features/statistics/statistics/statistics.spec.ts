import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Statistics } from './statistics';
import { provideStore,Store  } from '@ngrx/store';

import { taskReducer } from '../../tasks/store/reducers/task.reducer';



describe('Statistics', () => {
  let component: Statistics;
  let fixture: ComponentFixture<Statistics>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Statistics],
      providers: [
        provideStore({
          tasks: taskReducer
        })
      ]
    }).compileComponents();

    fixture =
        TestBed.createComponent(Statistics);
    
        component =
          fixture.componentInstance;
    
        fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('debería crear los observables de estadísticas', () => {

    expect(component.pendingCount$)
      .toBeTruthy();

    expect(component.completedCount$)
      .toBeTruthy();

    expect(component.trashCount$)
      .toBeTruthy();

  });

});
