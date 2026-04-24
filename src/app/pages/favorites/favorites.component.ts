import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Movie } from '../../models/movie.model';
import { MovieService } from '../../services/movie.service';
import { NotificationService } from '../../services/notification.service';
import { EmptyStateComponent } from '../../shared/components/empty-state/empty-state.component';
import { MovieCardComponent } from '../../shared/components/movie-card/movie-card.component';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [CommonModule, MovieCardComponent, EmptyStateComponent],
  template: `
    <section class="container py-4">
      <h2>Favorites</h2>
      <div class="movie-grid mt-3" *ngIf="movies.length">
        <app-movie-card *ngFor="let movie of movies" [movie]="movie" (favorite)="removeFavorite($event)" (watchlist)="addWatchlist($event)"></app-movie-card>
      </div>
      <app-empty-state *ngIf="!movies.length" title="No favorites yet" message="Add movies from any page to see them here"></app-empty-state>
    </section>
  `,
  styles: [`.movie-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(185px,1fr)); gap:1rem; }`],
})
export class FavoritesComponent implements OnInit {
  movies: Movie[] = [];

  constructor(
    private readonly movieService: MovieService,
    private readonly notifications: NotificationService,
  ) {}

  ngOnInit(): void {
    this.movies = this.movieService.getFavorites();
  }

  removeFavorite(movie: Movie): void {
    this.movieService.removeFavorite(movie.id);
    this.movies = this.movieService.getFavorites();
    this.notifications.show('Removed from favorites', 'info');
  }

  addWatchlist(movie: Movie): void {
    this.movieService.addWatchlist(movie);
    this.notifications.show('Added to watchlist', 'success');
  }
}
