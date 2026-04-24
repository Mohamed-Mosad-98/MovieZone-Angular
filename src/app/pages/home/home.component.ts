import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { Movie } from '../../models/movie.model';
import { MovieService } from '../../services/movie.service';
import { NotificationService } from '../../services/notification.service';
import { HeroBannerComponent } from '../../shared/components/hero-banner/hero-banner.component';
import { MovieCardComponent } from '../../shared/components/movie-card/movie-card.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HeroBannerComponent, MovieCardComponent],
  template: `
    <section class="container py-4">
      <app-hero-banner [movie]="heroMovie" (moreInfo)="openMovie($event)"></app-hero-banner>

      <ng-container *ngFor="let section of sections">
        <div class="d-flex justify-content-between align-items-center mb-2">
          <h4 class="mb-0">{{ section.title }}</h4>
        </div>
        <div class="movie-grid mb-4">
          <app-movie-card
            *ngFor="let movie of section.movies"
            [movie]="movie"
            (favorite)="addFavorite($event)"
            (watchlist)="addWatchlist($event)"
          ></app-movie-card>
        </div>
      </ng-container>
    </section>
  `,
  styles: [`.movie-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(185px,1fr)); gap:1rem; }`],
})
export class HomeComponent implements OnInit {
  heroMovie!: Movie;
  sections: { title: string; movies: Movie[] }[] = [];

  constructor(
    private readonly movieService: MovieService,
    private readonly notifications: NotificationService,
    private readonly router: Router,
  ) {}

  ngOnInit(): void {
    forkJoin({
      trending: this.movieService.getTrending(),
      popular: this.movieService.getPopular(),
      topRated: this.movieService.getTopRated(),
    }).subscribe(({ trending, popular, topRated }) => {
      this.heroMovie = trending.results[0];
      this.sections = [
        { title: 'Trending Now', movies: trending.results.slice(0, 12) },
        { title: 'Popular Movies', movies: popular.results.slice(0, 12) },
        { title: 'Top Rated', movies: topRated.results.slice(0, 12) },
        { title: 'Continue Watching', movies: this.movieService.getWatchlist().slice(0, 12) },
      ];
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

  openMovie(movie: Movie): void {
    this.router.navigate(['/movie', movie.id]);
  }
}
