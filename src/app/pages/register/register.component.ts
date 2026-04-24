import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { NotificationService } from '../../services/notification.service';

function passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
  const password = control.get('password')?.value;
  const confirmPassword = control.get('confirmPassword')?.value;
  return password === confirmPassword ? null : { mismatch: true };
}

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  template: `
    <section class="container py-5">
      <div class="row justify-content-center">
        <div class="col-md-7 col-lg-5">
          <div class="card bg-dark border-secondary text-light">
            <div class="card-body p-4">
              <h2 class="mb-3">Create Account</h2>
              <form [formGroup]="form" (ngSubmit)="submit()">
                <div class="mb-2"><input class="form-control bg-black text-light border-secondary" placeholder="Name" formControlName="name" /></div>
                <div class="mb-2"><input class="form-control bg-black text-light border-secondary" placeholder="Email" formControlName="email" /></div>
                <div class="mb-2"><input type="password" class="form-control bg-black text-light border-secondary" placeholder="Password" formControlName="password" /></div>
                <div class="mb-3"><input type="password" class="form-control bg-black text-light border-secondary" placeholder="Confirm Password" formControlName="confirmPassword" /></div>
                <button class="btn btn-danger w-100" [disabled]="form.invalid">Register</button>
              </form>
              <p class="mb-0 mt-3">Already have account? <a routerLink="/login">Login</a></p>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
})
export class RegisterComponent {
  readonly form = this.fb.group(
    {
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
    },
    { validators: passwordMatchValidator },
  );

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
    const { confirmPassword, ...payload } = this.form.getRawValue();
    const success = this.authService.register(payload as { name: string; email: string; password: string });
    if (!success) {
      this.notifications.show('Email already exists', 'error');
      return;
    }
    this.notifications.show('Registered successfully, please login', 'success');
    this.router.navigateByUrl('/login');
  }
}
