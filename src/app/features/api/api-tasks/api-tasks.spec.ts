import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiTasks } from './api-tasks';

import { provideMockStore } from '@ngrx/store/testing';

describe('ApiTasks', () => {
  let component: ApiTasks;
  let fixture: ComponentFixture<ApiTasks>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApiTasks],
      providers: [
        provideMockStore({
          initialState: {
            tasks: {
              tasks: [],
              trash: [],
              apiTasks: []
            }
          }
        })
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ApiTasks);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
