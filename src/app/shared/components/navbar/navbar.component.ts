import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  template: `
    <nav class="navbar navbar-expand-lg fixed-top app-navbar">
      <div class="container">
        <a class="navbar-brand logo" routerLink="/">MovieZone</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mainNav">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="mainNav">
          <ul class="navbar-nav ms-auto gap-lg-2">
            <li class="nav-item"><a class="nav-link" routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{ exact: true }">Home</a></li>
            <li class="nav-item"><a class="nav-link" routerLink="/movies" routerLinkActive="active">Movies</a></li>
            <li class="nav-item"><a class="nav-link" routerLink="/trending" routerLinkActive="active">Trending</a></li>
            <li class="nav-item"><a class="nav-link" routerLink="/search" routerLinkActive="active">Search</a></li>
            <li class="nav-item"><a class="nav-link" routerLink="/favorites" routerLinkActive="active">Favorites</a></li>
            <li class="nav-item"><a class="nav-link" routerLink="/watchlist" routerLinkActive="active">Watchlist</a></li>
            <li class="nav-item"><a class="nav-link" routerLink="/profile" routerLinkActive="active">Profile</a></li>
            <li class="nav-item" *ngIf="!authService.isLoggedIn()"><a class="btn btn-danger btn-sm rounded-pill px-3 mt-1" routerLink="/login">Login</a></li>
            <li class="nav-item" *ngIf="authService.isLoggedIn()"><button class="btn btn-outline-light btn-sm rounded-pill px-3 mt-1" (click)="logout()">Logout</button></li>
          </ul>
        </div>
      </div>
    </nav>
  `,
  styles: [
    `
      .app-navbar { background: rgba(7, 8, 12, 0.92); backdrop-filter: blur(10px); border-bottom: 1px solid #222834; }
      .logo { color: #e50914; font-weight: 800; letter-spacing: 0.8px; }
      .nav-link { color: #c7ced9; font-size: .95rem; }
      .nav-link.active, .nav-link:hover { color: #fff; }
    `,
  ],
})
export class NavbarComponent {
  constructor(public readonly authService: AuthService) {}

  logout(): void {
    this.authService.logout();
  }
}
