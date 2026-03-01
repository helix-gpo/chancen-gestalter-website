import { ChangeDetectorRef, Component, ElementRef, inject, ViewChild } from '@angular/core';
import { Icon } from '../../util/icon/icon';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Contact } from '../../services/contact';

@Component({
  selector: 'app-main',
  imports: [Icon, FormsModule],
  templateUrl: './main.html',
  styleUrl: './main.css',
})
export class Main {
  private router: Router = inject(Router);
  private contactService: Contact = inject(Contact);
  private cdr: ChangeDetectorRef = inject(ChangeDetectorRef);

  @ViewChild('nameInput') nameInput!: ElementRef<HTMLInputElement>;

  open1 = false;
  open2 = false;
  open3 = false;
  open4 = false;
  open5 = false;

  sendingForm = false;

  nameInputValue = '';
  emailInputValue = '';
  phoneInputValue = '';
  choice = 'Bitte auswählen';
  messageInputValue = '';
  datenschutzChecked = false;

  showNameWarning = false;
  showEmailWarning = false;
  showChoiceWarning = false;
  showMessageWarning = false;
  showDatenschutzWarning = false;

  showSuccessMessageText = false;
  showErrorMessageText = false;
  showWarningMessageText = false;

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

  handleSendContactFormClick() {
    if (this.validateInputFields()) {
      this.sendingForm = true;

      this.contactService
        .sendContactForm({
          name: this.nameInputValue,
          email: this.emailInputValue,
          number: this.phoneInputValue,
          choice: this.choice,
          text: this.messageInputValue,
        })
        .subscribe({
          next: (response) => {
            this.showSuccessMessage();
            this.sendingForm = false;
            this.resetForm();
            this.cdr.detectChanges();
          },
          error: (error) => {
            this.showErrorMessage();
            this.sendingForm = false;
            this.cdr.detectChanges();
          },
        });
    } else {
      this.showWarningMessage();
    }
  }

  validateInputFields(): boolean {
    this.showNameWarning = !this.nameInputValue.trim();
    this.showEmailWarning = !this.emailInputValue.trim();
    this.showChoiceWarning = this.choice === 'Bitte auswählen';
    this.showMessageWarning = !this.messageInputValue.trim();
    this.showDatenschutzWarning = !this.datenschutzChecked;

    return (
      !this.showNameWarning &&
      !this.showEmailWarning &&
      !this.showChoiceWarning &&
      !this.showMessageWarning &&
      !this.showDatenschutzWarning
    );
  }

  resetForm() {
    this.nameInputValue = '';
    this.emailInputValue = '';
    this.phoneInputValue = '';
    this.choice = 'Bitte auswählen';
    this.messageInputValue = '';
    this.datenschutzChecked = false;
  }

  private showSuccessMessage() {
    this.showErrorMessageText = false;
    this.showWarningMessageText = false;

    this.showSuccessMessageText = true;
  }

  private showErrorMessage() {
    this.showSuccessMessageText = false;
    this.showWarningMessageText = false;

    this.showErrorMessageText = true;
  }

  private showWarningMessage() {
    this.showSuccessMessageText = false;
    this.showErrorMessageText = false;

    this.showWarningMessageText = true;
  }
}
