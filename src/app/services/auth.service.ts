import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { STORAGE_KEYS } from '../core/storage-keys';
import { LoginPayload, User } from '../models/user.model';
import { StorageService } from './storage.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly token$ = new BehaviorSubject<string | null>(localStorage.getItem(STORAGE_KEYS.authToken));
  readonly isAuthenticated$ = this.token$.asObservable();

  constructor(private readonly storage: StorageService) {}

  register(user: User): boolean {
    const users = this.storage.get<User[]>(STORAGE_KEYS.users, []);
    const exists = users.some((item) => item.email.toLowerCase() === user.email.toLowerCase());
    if (exists) {
      return false;
    }
    users.push(user);
    this.storage.set(STORAGE_KEYS.users, users);
    return true;
  }

  login(payload: LoginPayload): boolean {
    const users = this.storage.get<User[]>(STORAGE_KEYS.users, []);
    const found = users.find(
      (user) => user.email.toLowerCase() === payload.email.toLowerCase() && user.password === payload.password,
    );
    if (!found) {
      return false;
    }
    const token = `fake-jwt-${Date.now()}`;
    localStorage.setItem(STORAGE_KEYS.authToken, token);
    this.storage.set(STORAGE_KEYS.userData, { name: found.name, email: found.email });
    this.token$.next(token);
    return true;
  }

  logout(): void {
    this.storage.remove(STORAGE_KEYS.authToken);
    this.storage.remove(STORAGE_KEYS.userData);
    this.token$.next(null);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem(STORAGE_KEYS.authToken);
  }

  getCurrentUser(): { name: string; email: string } | null {
    return this.storage.get<{ name: string; email: string } | null>(STORAGE_KEYS.userData, null);
  }

  getToken(): string | null {
    return localStorage.getItem(STORAGE_KEYS.authToken);
  }
}
