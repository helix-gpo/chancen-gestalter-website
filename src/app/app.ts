import { Component, inject, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { Icon } from './util/icon/icon';
import { MatDialog } from '@angular/material/dialog';
import { MenuModal } from './util/menu-modal/menu-modal';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Icon],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('chancen-gestalter-website');

  private dialog: MatDialog = inject(MatDialog);
  private router: Router = inject(Router);

  ngOnInit() {
    /* this.updateYear(); */
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

  routing(url: string) {
    this.router.navigate([url]).then(() => {
      this.scrollToElement('header');
    });
  }

  downloadSatzung() {
    window.open('assets/satzung.pdf');
  }

  downloadAGBs() {
    window.open('assets/AGBs.pdf');
  }

  handleMenuButtonClick() {
    let dialogRef = this.dialog.open(MenuModal, {
      panelClass: 'menu-modal',
    });

    if (dialogRef) {
      dialogRef.afterClosed().subscribe((element) => {
        this.scrollToElementByButton(element);
      });
    }
  }
}
