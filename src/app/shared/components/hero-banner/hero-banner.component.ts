import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Movie } from '../../../models/movie.model';
import { MovieService } from '../../../services/movie.service';

@Component({
  selector: 'app-hero-banner',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="hero" *ngIf="movie">
      <img [src]="movieService.getImage(movie.backdrop_path, 'original')" [alt]="movie.title" />
      <div class="overlay">
        <h1>{{ movie.title }}</h1>
        <p>{{ movie.overview }}</p>
        <div class="d-flex gap-2">
          <button class="btn btn-danger px-4" (click)="play.emit(movie)">Play</button>
          <button class="btn btn-outline-light px-4" (click)="moreInfo.emit(movie)">More Info</button>
        </div>
      </div>
    </section>
  `,
  styles: [
    `
      .hero { position:relative; border-radius:16px; overflow:hidden; margin-bottom:1.5rem; }
      .hero img { width:100%; height:min(62vh,520px); object-fit:cover; filter:brightness(.6); }
      .overlay { position:absolute; inset:0; display:flex; flex-direction:column; justify-content:center; gap:1rem; padding:1.5rem; background:linear-gradient(90deg, rgba(0,0,0,.8), rgba(0,0,0,.2)); }
      .overlay p { max-width:680px; color:#d9dee8; }
    `,
  ],
})
export class HeroBannerComponent {
  @Input() movie!: Movie;
  @Output() play = new EventEmitter<Movie>();
  @Output() moreInfo = new EventEmitter<Movie>();

  constructor(public readonly movieService: MovieService) {}
}
