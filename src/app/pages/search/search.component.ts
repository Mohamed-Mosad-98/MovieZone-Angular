import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, filter, startWith, switchMap } from 'rxjs';
import { Movie } from '../../models/movie.model';
import { MovieService } from '../../services/movie.service';
import { NotificationService } from '../../services/notification.service';
import { EmptyStateComponent } from '../../shared/components/empty-state/empty-state.component';
import { MovieCardComponent } from '../../shared/components/movie-card/movie-card.component';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MovieCardComponent, EmptyStateComponent],
  template: `
    <section class="container py-4">
      <h2 class="mb-3">Search Movies</h2>
      <input class="form-control form-control-lg bg-dark text-light border-secondary mb-3" [formControl]="searchControl" placeholder="Type movie title..." />
      <div class="movie-grid" *ngIf="movies.length">
        <app-movie-card *ngFor="let movie of movies" [movie]="movie" (favorite)="addFavorite($event)" (watchlist)="addWatchlist($event)"></app-movie-card>
      </div>
      <app-empty-state *ngIf="!movies.length" title="No results yet" message="Start typing to discover movies"></app-empty-state>
    </section>
  `,
  styles: [`.movie-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(185px,1fr)); gap:1rem; }`],
})
export class SearchComponent {
  searchControl = new FormControl('', { nonNullable: true });
  movies: Movie[] = [];

  constructor(
    private readonly movieService: MovieService,
    private readonly notifications: NotificationService,
  ) {
    this.searchControl.valueChanges
      .pipe(
        startWith(''),
        debounceTime(400),
        distinctUntilChanged(),
        filter((query) => query.length > 1),
        switchMap((query) => this.movieService.searchMovies(query)),
      )
      .subscribe((response) => (this.movies = response.results));
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
