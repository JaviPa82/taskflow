import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';

import { Store } from '@ngrx/store';

import { selectPendingCount, selectCompletedCount, selectTrashCount } from '../../tasks/store/selectors/task.selectors';

import { AppState } from '../../tasks/store/task.state';

@Component({
  selector: 'app-statistics',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './statistics.html',
  styleUrl: './statistics.scss',
})
export class Statistics {

  private store = inject(Store<AppState>);

  pendingCount$ =  this.store.select(selectPendingCount);

  completedCount$ = this.store.select(selectCompletedCount);

  trashCount$ = this.store.select(selectTrashCount);

}