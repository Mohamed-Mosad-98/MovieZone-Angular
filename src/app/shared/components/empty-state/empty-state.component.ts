import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-empty-state',
  standalone: true,
  template: `
    <div class="empty text-center py-5">
      <h4>{{ title }}</h4>
      <p class="text-secondary mb-0">{{ message }}</p>
    </div>
  `,
})
export class EmptyStateComponent {
  @Input() title = 'No data found';
  @Input() message = 'Try another filter or action.';
}
