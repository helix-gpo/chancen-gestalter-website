import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ContactFormData } from '../model/contact-form-data';

@Injectable({
  providedIn: 'root',
})
export class Contact {
  private readonly baseUrl = environment.EMAIL_N8N_POST_URL;

  private httpClient: HttpClient = inject(HttpClient);

  sendContactForm(formData: ContactFormData): Observable<any> {
    return this.httpClient.post(this.baseUrl, formData);
  }
}
