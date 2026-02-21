import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-datenschutz',
  imports: [],
  templateUrl: './datenschutz.html',
  styleUrl: './datenschutz.css',
})
export class Datenschutz implements OnInit {
  private router: Router = inject(Router);
  currentDate: String = '';

  ngOnInit(): void {
    const date = new Date();
    this.currentDate = this.formatMonthYear(date.toString());
  }

  formatMonthYear(dateString: string) {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return '';
    }

    const formatter = new Intl.DateTimeFormat('de-DE', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    return formatter.format(date);
  }

  goBack() {
    this.router.navigate(['/']);
  }
}
