import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Genre, Movie } from '../../models/movie.model';
import { MovieService } from '../../services/movie.service';
import { NotificationService } from '../../services/notification.service';
import { GenreFilterComponent } from '../../shared/components/genre-filter/genre-filter.component';
import { MovieCardComponent } from '../../shared/components/movie-card/movie-card.component';

@Component({
  selector: 'app-movies',
  standalone: true,
  imports: [CommonModule, FormsModule, GenreFilterComponent, MovieCardComponent],
  template: `
    <section class="container py-4">
      <div class="d-flex flex-wrap gap-2 align-items-center mb-3">
        <h2 class="me-auto mb-0">Movies</h2>
        <app-genre-filter [genres]="genres" (changed)="onGenreChanged($event)"></app-genre-filter>
        <select class="form-select w-auto bg-dark text-light border-secondary" [(ngModel)]="sortBy" (change)="loadMovies(true)">
          <option value="popularity.desc">Most Popular</option>
          <option value="vote_average.desc">Top Rated</option>
          <option value="release_date.desc">Latest</option>
        </select>
      </div>
      <div class="movie-grid">
        <app-movie-card *ngFor="let movie of movies" [movie]="movie" (favorite)="addFavorite($event)" (watchlist)="addWatchlist($event)"></app-movie-card>
      </div>
      <div class="text-center mt-4">
        <button class="btn btn-outline-light" (click)="loadMovies()">Load More</button>
      </div>
    </section>
  `,
  styles: [`.movie-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(185px,1fr)); gap:1rem; }`],
})
export class MoviesComponent implements OnInit {
  movies: Movie[] = [];
  genres: Genre[] = [];
  page = 1;
  selectedGenre = 0;
  sortBy = 'popularity.desc';

  constructor(
    private readonly movieService: MovieService,
    private readonly notifications: NotificationService,
  ) {}

  ngOnInit(): void {
    this.movieService.getGenres().subscribe((response) => (this.genres = response.genres));
    this.loadMovies(true);
  }

  onGenreChanged(genreId: number): void {
    this.selectedGenre = genreId;
    this.loadMovies(true);
  }

  loadMovies(reset = false): void {
    this.page = reset ? 1 : this.page + 1;
    this.movieService.discoverMovies(this.page, this.selectedGenre || undefined, this.sortBy).subscribe((response) => {
      this.movies = reset ? response.results : [...this.movies, ...response.results];
    });
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
