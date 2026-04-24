import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `<input class="form-control form-control-lg bg-dark text-light border-secondary" [formControl]="searchControl" placeholder="Search movies..." (input)="emitSearch()" />`,
})
export class SearchBarComponent {
  @Output() search = new EventEmitter<string>();
  searchControl = new FormControl('', { nonNullable: true });

  emitSearch(): void {
    this.search.emit(this.searchControl.value);
  }
}
