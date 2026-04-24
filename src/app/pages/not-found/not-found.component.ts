import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [RouterLink],
  template: `
    <section class="container py-5 text-center">
      <h1 class="display-2 fw-bold text-danger">404</h1>
      <h3>Page Not Found</h3>
      <p class="text-secondary">The page you are looking for does not exist.</p>
      <a class="btn btn-danger" routerLink="/">Back Home</a>
    </section>
  `,
})
export class NotFoundComponent {}
