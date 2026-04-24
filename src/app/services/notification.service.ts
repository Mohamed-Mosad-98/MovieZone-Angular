import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface ToastState {
  message: string;
  type: 'success' | 'error' | 'info';
  visible: boolean;
}

@Injectable({ providedIn: 'root' })
export class NotificationService {
  private readonly toastSubject = new BehaviorSubject<ToastState>({
    message: '',
    type: 'info',
    visible: false,
  });
  readonly toast$ = this.toastSubject.asObservable();

  show(message: string, type: ToastState['type'] = 'info'): void {
    this.toastSubject.next({ message, type, visible: true });
    setTimeout(() => this.hide(), 2800);
  }

  hide(): void {
    this.toastSubject.next({ ...this.toastSubject.value, visible: false });
  }
}
