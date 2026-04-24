import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  template: `
    <section class="container py-5">
      <div class="row justify-content-center">
        <div class="col-md-6 col-lg-5">
          <div class="card bg-dark border-secondary text-light">
            <div class="card-body p-4">
              <h2 class="mb-3">Login</h2>
              <form [formGroup]="form" (ngSubmit)="submit()">
                <div class="mb-3">
                  <label class="form-label">Email</label>
                  <input class="form-control bg-black text-light border-secondary" formControlName="email" />
                </div>
                <div class="mb-3">
                  <label class="form-label">Password</label>
                  <input type="password" class="form-control bg-black text-light border-secondary" formControlName="password" />
                </div>
                <button class="btn btn-danger w-100" [disabled]="form.invalid">Login</button>
              </form>
              <p class="mb-0 mt-3">No account? <a routerLink="/register">Register now</a></p>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
})
export class LoginComponent {
  readonly form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  constructor(
    private readonly fb: FormBuilder,
    private readonly authService: AuthService,
    private readonly notifications: NotificationService,
    private readonly router: Router,
  ) {}

  submit(): void {
    if (this.form.invalid) {
      return;
    }
    const success = this.authService.login(this.form.getRawValue() as { email: string; password: string });
    if (!success) {
      this.notifications.show('Invalid email or password', 'error');
      return;
    }
    this.notifications.show('Welcome back!', 'success');
    this.router.navigateByUrl('/');
  }
}
