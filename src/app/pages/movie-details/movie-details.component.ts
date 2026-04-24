import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Movie, MovieDetails } from '../../models/movie.model';
import { MovieService } from '../../services/movie.service';
import { NotificationService } from '../../services/notification.service';
import { MovieCardComponent } from '../../shared/components/movie-card/movie-card.component';

@Component({
  selector: 'app-movie-details',
  standalone: true,
  imports: [CommonModule, RouterLink, MovieCardComponent],
  template: `
    <section class="container py-4" *ngIf="movie">
      <div class="row g-4">
        <div class="col-md-4">
          <img class="img-fluid rounded-3 shadow" [src]="movieService.getImage(movie.poster_path, 'w780')" [alt]="movie.title" />
        </div>
        <div class="col-md-8">
          <h1>{{ movie.title }}</h1>
          <p class="text-secondary">{{ movie.tagline }}</p>
          <p>{{ movie.overview }}</p>
          <div class="d-flex flex-wrap gap-2 mb-3">
            <span class="badge bg-danger">Rating {{ movie.vote_average | number: '1.1-1' }}</span>
            <span class="badge bg-secondary">Release {{ movie.release_date }}</span>
            <span class="badge bg-dark border" *ngFor="let genre of movie.genres">{{ genre.name }}</span>
          </div>
          <div class="d-flex gap-2">
            <button class="btn btn-danger" (click)="addFavorite(movie)">Add Favorite</button>
            <button class="btn btn-outline-light" (click)="addWatchlist(movie)">Add Watchlist</button>
          </div>
        </div>
      </div>

      <h4 class="mt-5 mb-3">Similar Movies</h4>
      <div class="movie-grid">
        <app-movie-card *ngFor="let item of similarMovies" [movie]="item" (favorite)="addFavorite($event)" (watchlist)="addWatchlist($event)"></app-movie-card>
      </div>
    </section>
  `,
  styles: [`.movie-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(180px,1fr)); gap:1rem; }`],
})
export class MovieDetailsComponent implements OnInit {
  movie!: MovieDetails;
  similarMovies: Movie[] = [];

  constructor(
    private readonly route: ActivatedRoute,
    public readonly movieService: MovieService,
    private readonly notifications: NotificationService,
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id') ?? '';
    this.movieService.getMovieDetails(id).subscribe((movie) => (this.movie = movie));
    this.movieService.getSimilarMovies(id).subscribe((response) => (this.similarMovies = response.results.slice(0, 10)));
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
