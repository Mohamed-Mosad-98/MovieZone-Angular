import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Movie } from '../../../models/movie.model';
import { MovieService } from '../../../services/movie.service';

@Component({
  selector: 'app-movie-card',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <article class="movie-card">
      <a [routerLink]="['/movie', movie.id]">
        <img [src]="movieService.getImage(movie.poster_path)" [alt]="movie.title" />
      </a>
      <span class="rating">{{ movie.vote_average | number: '1.1-1' }}</span>
      <div class="actions">
        <button class="btn btn-sm btn-outline-light" (click)="favorite.emit(movie)">❤</button>
        <button class="btn btn-sm btn-outline-light" (click)="watchlist.emit(movie)">+ List</button>
      </div>
      <h6 class="mt-2">{{ movie.title }}</h6>
    </article>
  `,
  styles: [
    `
      .movie-card { position:relative; background:#141922; border:1px solid #232a36; border-radius:12px; padding:10px; transition:.25s; }
      .movie-card:hover { transform: translateY(-6px) scale(1.01); box-shadow:0 14px 24px rgba(0,0,0,.35); }
      img { width:100%; aspect-ratio:2/3; border-radius:8px; object-fit:cover; }
      .rating { position:absolute; top:14px; left:14px; background:#e50914; color:#fff; padding:2px 8px; border-radius:999px; font-size:.75rem; }
      .actions { position:absolute; right:14px; top:14px; display:flex; gap:6px; opacity:0; transition:.2s; }
      .movie-card:hover .actions { opacity:1; }
      h6 { color:#ecf0f6; font-size:.95rem; margin-bottom:0; min-height:2.4rem; }
    `,
  ],
})
export class MovieCardComponent {
  @Input() movie!: Movie;
  @Output() favorite = new EventEmitter<Movie>();
  @Output() watchlist = new EventEmitter<Movie>();

  constructor(public readonly movieService: MovieService) {}
}
