import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

export const appRoutes: Routes = [
  { path: '', loadComponent: () => import('./pages/home/home.component').then((m) => m.HomeComponent) },
  { path: 'movies', loadComponent: () => import('./pages/movies/movies.component').then((m) => m.MoviesComponent) },
  { path: 'movie/:id', loadComponent: () => import('./pages/movie-details/movie-details.component').then((m) => m.MovieDetailsComponent) },
  { path: 'trending', loadComponent: () => import('./pages/trending/trending.component').then((m) => m.TrendingComponent) },
  { path: 'search', loadComponent: () => import('./pages/search/search.component').then((m) => m.SearchComponent) },
  { path: 'login', loadComponent: () => import('./pages/login/login.component').then((m) => m.LoginComponent) },
  { path: 'register', loadComponent: () => import('./pages/register/register.component').then((m) => m.RegisterComponent) },
  {
    path: 'favorites',
    canActivate: [authGuard],
    loadComponent: () => import('./pages/favorites/favorites.component').then((m) => m.FavoritesComponent),
  },
  {
    path: 'watchlist',
    canActivate: [authGuard],
    loadComponent: () => import('./pages/watchlist/watchlist.component').then((m) => m.WatchlistComponent),
  },
  {
    path: 'profile',
    canActivate: [authGuard],
    loadComponent: () => import('./pages/profile/profile.component').then((m) => m.ProfileComponent),
  },
  { path: '**', loadComponent: () => import('./pages/not-found/not-found.component').then((m) => m.NotFoundComponent) },
];
