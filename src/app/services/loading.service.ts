import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LoadingService {
  private readonly pending = new BehaviorSubject(0);
  readonly isLoading$ = this.pending.asObservable();

  start(): void {
    this.pending.next(this.pending.value + 1);
  }

  stop(): void {
    this.pending.next(Math.max(0, this.pending.value - 1));
  }
}
