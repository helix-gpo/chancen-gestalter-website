import { Component, inject } from '@angular/core';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-impressum',
  imports: [],
  templateUrl: './impressum.html',
  styleUrl: './impressum.css',
})
export class Impressum {
  private router: Router = inject(Router);

  goBack() {
    this.router.navigate(['/']);
  }
}
