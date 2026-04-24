import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MovieService } from '../../services/movie.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="container py-5">
      <div class="card bg-dark border-secondary text-light mx-auto" style="max-width: 600px;">
        <div class="card-body p-4">
          <h2>Profile</h2>
          <p><strong>Name:</strong> {{ user?.name }}</p>
          <p><strong>Email:</strong> {{ user?.email }}</p>
          <hr />
          <p><strong>Favorites:</strong> {{ favoriteCount }}</p>
          <p><strong>Watchlist:</strong> {{ watchlistCount }}</p>
          <button class="btn btn-outline-light" (click)="logout()">Logout</button>
        </div>
      </div>
    </section>
  `,
})
export class ProfileComponent {
  user = this.authService.getCurrentUser();
  favoriteCount = this.movieService.getFavorites().length;
  watchlistCount = this.movieService.getWatchlist().length;

  constructor(
    private readonly authService: AuthService,
    private readonly movieService: MovieService,
    private readonly router: Router,
  ) {}

  logout(): void {
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }
}
