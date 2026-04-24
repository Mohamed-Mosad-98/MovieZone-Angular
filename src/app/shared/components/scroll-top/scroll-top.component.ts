import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-scroll-top',
  standalone: true,
  imports: [CommonModule],
  template: `<button class="btn btn-danger scroll-top" *ngIf="visible" (click)="goTop()">↑</button>`,
  styles: [
    `
      .scroll-top { position:fixed; right:18px; bottom:85px; z-index:1100; border-radius:50%; width:42px; height:42px; }
    `,
  ],
})
export class ScrollTopComponent {
  visible = false;

  @HostListener('window:scroll')
  onScroll(): void {
    this.visible = window.scrollY > 250;
  }

  goTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
