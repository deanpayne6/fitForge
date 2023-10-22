import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  sendPostRequest(formData: any): Observable<any> {
    const url = 'https://api.fitforgebackend.com:3200/questionnaire/submission'; // Replace with your actual POST endpoint
    return this.http.post(url, formData);
  }
}