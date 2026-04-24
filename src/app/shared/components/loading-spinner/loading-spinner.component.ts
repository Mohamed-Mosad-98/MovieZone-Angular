import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { map } from 'rxjs';
import { LoadingService } from '../../../services/loading.service';

@Component({
  selector: 'app-loading-spinner',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="overlay" *ngIf="(isLoading$ | async)">
      <div class="spinner-border text-danger" role="status"></div>
    </div>
  `,
  styles: [
    `
      .overlay { position:fixed; inset:0; z-index:1090; background:rgba(0,0,0,.35); display:grid; place-items:center; }
    `,
  ],
})
export class LoadingSpinnerComponent {
  readonly isLoading$ = this.loadingService.isLoading$.pipe(map((count) => count > 0));
  constructor(private readonly loadingService: LoadingService) {}
}
