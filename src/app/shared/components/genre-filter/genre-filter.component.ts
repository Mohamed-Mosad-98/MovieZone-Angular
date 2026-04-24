import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Genre } from '../../../models/movie.model';

@Component({
  selector: 'app-genre-filter',
  standalone: true,
  imports: [CommonModule],
  template: `
    <select class="form-select bg-dark text-light border-secondary" (change)="onChange($event)">
      <option [value]="0">All Genres</option>
      <option *ngFor="let genre of genres" [value]="genre.id">{{ genre.name }}</option>
    </select>
  `,
})
export class GenreFilterComponent {
  @Input() genres: Genre[] = [];
  @Output() changed = new EventEmitter<number>();

  onChange(event: Event): void {
    const value = Number((event.target as HTMLSelectElement).value);
    this.changed.emit(value);
  }
}
