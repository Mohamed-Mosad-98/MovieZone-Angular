import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Movie } from '../../models/movie.model';
import { MovieService } from '../../services/movie.service';
import { NotificationService } from '../../services/notification.service';
import { EmptyStateComponent } from '../../shared/components/empty-state/empty-state.component';
import { MovieCardComponent } from '../../shared/components/movie-card/movie-card.component';

@Component({
  selector: 'app-watchlist',
  standalone: true,
  imports: [CommonModule, MovieCardComponent, EmptyStateComponent],
  template: `
    <section class="container py-4">
      <h2>Watchlist</h2>
      <div class="movie-grid mt-3" *ngIf="movies.length">
        <app-movie-card *ngFor="let movie of movies" [movie]="movie" (favorite)="addFavorite($event)" (watchlist)="removeWatchlist($event)"></app-movie-card>
      </div>
      <app-empty-state *ngIf="!movies.length" title="Watchlist is empty" message="Save titles to watch later"></app-empty-state>
    </section>
  `,
  styles: [`.movie-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(185px,1fr)); gap:1rem; }`],
})
export class WatchlistComponent implements OnInit {
  movies: Movie[] = [];

  constructor(
    private readonly movieService: MovieService,
    private readonly notifications: NotificationService,
  ) {}

  ngOnInit(): void {
    this.movies = this.movieService.getWatchlist();
  }

  removeWatchlist(movie: Movie): void {
    this.movieService.removeWatchlist(movie.id);
    this.movies = this.movieService.getWatchlist();
    this.notifications.show('Removed from watchlist', 'info');
  }

  addFavorite(movie: Movie): void {
    this.movieService.addFavorite(movie);
    this.notifications.show('Added to favorites', 'success');
  }
}
