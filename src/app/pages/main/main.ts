import { Component, inject } from '@angular/core';
import { Icon } from '../../util/icon/icon';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  imports: [Icon],
  templateUrl: './main.html',
  styleUrl: './main.css',
})
export class Main {
  private router: Router = inject(Router);

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
}
