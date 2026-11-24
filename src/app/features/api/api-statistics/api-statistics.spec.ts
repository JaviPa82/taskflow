import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';

import { ApiStatistics } from './api-statistics';

describe('ApiStatistics', () => {
  let component: ApiStatistics;
  let fixture: ComponentFixture<ApiStatistics>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApiStatistics],
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

    fixture = TestBed.createComponent(ApiStatistics);
    component = fixture.componentInstance;

    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});