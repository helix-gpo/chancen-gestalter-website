import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-datenschutz',
  imports: [],
  templateUrl: './datenschutz.html',
  styleUrl: './datenschutz.css',
})
export class Datenschutz implements OnInit {
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
}
