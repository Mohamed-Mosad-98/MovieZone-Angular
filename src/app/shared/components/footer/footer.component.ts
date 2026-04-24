import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  template: `
    <footer class="footer py-4">
      <div class="container d-flex flex-wrap justify-content-between gap-2">
        <span>© 2026 MovieZone. Stream smarter.</span>
        <div class="links">
          <a href="#">Privacy</a>
          <a href="#">Terms</a>
          <a href="#">Support</a>
        </div>
      </div>
    </footer>
  `,
  styles: [
    `
      .footer { background:#0c1016; border-top:1px solid #1a212d; color:#9aa3b2; }
      .links { display:flex; gap:1rem; }
      .links a { color:#9aa3b2; text-decoration:none; }
      .links a:hover { color:#fff; }
    `,
  ],
})
export class FooterComponent {}
