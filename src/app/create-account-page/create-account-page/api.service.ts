import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  checkEmailAvailability(email: string): Observable<{ exists: boolean }> {
    const url = `http://localhost:3200/checkEmailAvailability?email=${email}`;
    return this.http.get<{ exists: boolean }>(url);
  }

  checkUsernameAvailability(username: string): Observable<{ exists: boolean }> {
    const url = `http://localhost:3200/checkUsernameAvailability?username=${username}`;
    return this.http.get<{ exists: boolean }>(url);
  }

  sendPostRequest(formData: any): Observable<any> {
    const url = 'http://localhost:3200/registerInfo'; // Replace with your actual POST endpoint
    return this.http.post(url, formData);
  }
}