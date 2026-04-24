import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Movie } from '../../models/movie.model';
import { MovieService } from '../../services/movie.service';
import { NotificationService } from '../../services/notification.service';
import { MovieCardComponent } from '../../shared/components/movie-card/movie-card.component';

@Component({
  selector: 'app-trending',
  standalone: true,
  imports: [CommonModule, MovieCardComponent],
  template: `
    <section class="container py-4">
      <h2 class="mb-3">Trending This Week</h2>
      <div class="movie-grid">
        <app-movie-card *ngFor="let movie of movies" [movie]="movie" (favorite)="addFavorite($event)" (watchlist)="addWatchlist($event)"></app-movie-card>
      </div>
    </section>
  `,
  styles: [`.movie-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(185px,1fr)); gap:1rem; }`],
})
export class TrendingComponent implements OnInit {
  movies: Movie[] = [];

  constructor(
    private readonly movieService: MovieService,
    private readonly notifications: NotificationService,
  ) {}

  ngOnInit(): void {
    this.movieService.getTrending().subscribe((response) => (this.movies = response.results));
  }

  addFavorite(movie: Movie): void {
    this.movieService.addFavorite(movie);
    this.notifications.show('Added to favorites', 'success');
  }

  addWatchlist(movie: Movie): void {
    this.movieService.addWatchlist(movie);
    this.notifications.show('Added to watchlist', 'success');
  }
}
