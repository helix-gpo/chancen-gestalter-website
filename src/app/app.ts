import { Component, inject, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('chancen-gestalter-website');

  private router: Router = inject(Router);

  ngOnInit() {
    this.updateYear();
  }

  scrollToElementByButton(elementId: string) {
    const currentUrl = this.router.url;

    if (
      currentUrl === '/impressum' ||
      currentUrl === '/datenschutz' ||
      currentUrl === '/feedback' ||
      currentUrl === '/error' ||
      currentUrl.startsWith('/project-details')
    ) {
      this.router.navigate(['/']);
    } else {
      this.scrollToElement(elementId);
    }
  }

  scrollToElement(elementId: string) {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  updateYear() {
    const yearEl = document.querySelector('.year');
    const currentYear = new Date().getFullYear();
    if (yearEl) {
      yearEl.innerHTML = String(currentYear);
    }
  }
}
