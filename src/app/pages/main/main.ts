import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { Icon } from '../../util/icon/icon';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-main',
  imports: [Icon, FormsModule],
  templateUrl: './main.html',
  styleUrl: './main.css',
})
export class Main {
  private router: Router = inject(Router);

  @ViewChild('nameInput') nameInput!: ElementRef<HTMLInputElement>;

  open1 = false;
  open2 = false;
  open3 = false;
  open4 = false;
  open5 = false;

  choice = 'Bitte auswählen';

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

  handleLeistungCardClick(leistung: string) {
    this.choice = leistung;

    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  handleCallClick() {
    window.location.href = 'tel:+491773830074';
  }

  handleSendMailClick() {
    window.location.href = 'mailto:chancengestalter@yahoo.com';
  }
}
