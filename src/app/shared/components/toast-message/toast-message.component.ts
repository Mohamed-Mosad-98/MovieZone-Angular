import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NotificationService } from '../../../services/notification.service';

@Component({
  selector: 'app-toast-message',
  standalone: true,
  imports: [CommonModule],
  template: `
    <ng-container *ngIf="notificationService.toast$ | async as toast">
      <div class="toast-box show" *ngIf="toast.visible && toast.message">
        <div class="alert mb-0" [ngClass]="{ 'alert-success': toast.type === 'success', 'alert-danger': toast.type === 'error', 'alert-info': toast.type === 'info' }">
          {{ toast.message }}
        </div>
      </div>
    </ng-container>
  `,
  styles: [
    `
      .toast-box { position:fixed; right:18px; bottom:18px; z-index:1200; width:min(320px,90vw); }
      .toast-box.show { animation:slideIn .2s ease; }
      @keyframes slideIn { from { transform: translateY(12px); opacity:0; } to { transform: translateY(0); opacity:1; } }
    `,
  ],
})
export class ToastMessageComponent {
  constructor(public readonly notificationService: NotificationService) {}
}
