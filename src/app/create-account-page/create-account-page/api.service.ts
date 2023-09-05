import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  checkEmailAvailability(email: string): Observable<boolean> {
    const url = 'http://localhost:3200/getEmailData';
    return this.http.post<boolean>(url, { email });
  }
}