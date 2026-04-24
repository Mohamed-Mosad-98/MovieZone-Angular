import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { STORAGE_KEYS } from '../core/storage-keys';
import { Genre, Movie, MovieDetails, MovieResponse } from '../models/movie.model';
import { StorageService } from './storage.service';

@Injectable({ providedIn: 'root' })
export class MovieService {
  private readonly baseUrl = environment.tmdbBaseUrl;

  constructor(
    private readonly http: HttpClient,
    private readonly storage: StorageService,
  ) {}

  getTrending(page = 1): Observable<MovieResponse> {
    return this.get<MovieResponse>('/trending/movie/week', page);
  }

  getPopular(page = 1): Observable<MovieResponse> {
    return this.get<MovieResponse>('/movie/popular', page);
  }

  getTopRated(page = 1): Observable<MovieResponse> {
    return this.get<MovieResponse>('/movie/top_rated', page);
  }

  discoverMovies(page = 1, genreId?: number, sortBy = 'popularity.desc'): Observable<MovieResponse> {
    let params = new HttpParams().set('page', page).set('sort_by', sortBy);
    if (genreId) {
      params = params.set('with_genres', genreId);
    }
    return this.http.get<MovieResponse>(`${this.baseUrl}/discover/movie`, { params: this.withApiKey(params) });
  }

  searchMovies(query: string): Observable<MovieResponse> {
    const params = this.withApiKey(new HttpParams().set('query', query));
    return this.http.get<MovieResponse>(`${this.baseUrl}/search/movie`, { params });
  }

  getMovieDetails(id: string): Observable<MovieDetails> {
    return this.http.get<MovieDetails>(`${this.baseUrl}/movie/${id}`, { params: this.withApiKey() });
  }

  getGenres(): Observable<{ genres: Genre[] }> {
    return this.http.get<{ genres: Genre[] }>(`${this.baseUrl}/genre/movie/list`, { params: this.withApiKey() });
  }

  getSimilarMovies(id: string): Observable<MovieResponse> {
    return this.http.get<MovieResponse>(`${this.baseUrl}/movie/${id}/similar`, { params: this.withApiKey() });
  }

  getImage(path: string | null, size: 'w500' | 'w780' | 'original' = 'w500'): string {
    return path ? `${environment.tmdbImageBaseUrl}/${size}${path}` : 'https://placehold.co/500x750/111/EEE?text=No+Poster';
  }

  addFavorite(movie: Movie): void {
    const favorites = this.storage.get<Movie[]>(STORAGE_KEYS.favorites, []);
    if (favorites.some((item) => item.id === movie.id)) {
      return;
    }
    favorites.push(movie);
    this.storage.set(STORAGE_KEYS.favorites, favorites);
  }

  removeFavorite(movieId: number): void {
    const favorites = this.storage.get<Movie[]>(STORAGE_KEYS.favorites, []).filter((movie) => movie.id !== movieId);
    this.storage.set(STORAGE_KEYS.favorites, favorites);
  }

  getFavorites(): Movie[] {
    return this.storage.get<Movie[]>(STORAGE_KEYS.favorites, []);
  }

  addWatchlist(movie: Movie): void {
    const watchlist = this.storage.get<Movie[]>(STORAGE_KEYS.watchlist, []);
    if (watchlist.some((item) => item.id === movie.id)) {
      return;
    }
    watchlist.push(movie);
    this.storage.set(STORAGE_KEYS.watchlist, watchlist);
  }

  removeWatchlist(movieId: number): void {
    const watchlist = this.storage.get<Movie[]>(STORAGE_KEYS.watchlist, []).filter((movie) => movie.id !== movieId);
    this.storage.set(STORAGE_KEYS.watchlist, watchlist);
  }

  getWatchlist(): Movie[] {
    return this.storage.get<Movie[]>(STORAGE_KEYS.watchlist, []);
  }

  private get<T>(path: string, page = 1): Observable<T> {
    const params = this.withApiKey(new HttpParams().set('page', page));
    return this.http.get<T>(`${this.baseUrl}${path}`, { params }).pipe(
      tap(() => undefined),
      catchError(() => of({ results: [] } as T)),
    );
  }

  private withApiKey(params = new HttpParams()): HttpParams {
    return params.set('api_key', environment.tmdbApiKey);
  }
}
