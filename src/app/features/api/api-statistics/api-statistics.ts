import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';

import { Store } from '@ngrx/store';

import {
  selectApiTotalCount,
  selectApiCompletedCount,
  selectApiPendingCount,
  selectApiCompletionPercentage
} from '../../tasks/store/selectors/task.selectors';

import { AppState }
from '../../tasks/store/task.state';

@Component({
  selector: 'app-api-statistics',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './api-statistics.html'
})
export class ApiStatistics {

  private store = inject(Store<AppState>);

  total$ =
    this.store.select(
      selectApiTotalCount
    );

  completadas$ =
    this.store.select(
      selectApiCompletedCount
    );

  pendientes$ =
    this.store.select(
      selectApiPendingCount
    );

  porcentaje$ =
    this.store.select(
      selectApiCompletionPercentage
    );

}