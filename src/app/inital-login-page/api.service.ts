import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  checkLoginInfo(formData: any): Observable<any> {
    const url = `http://localhost:3200/login`;
    return this.http.get(url, formData)
  }


  sendPostRequest(formData: any): Observable<any> {
    const url = 'http://localhost:3200/registerInfo'; // Replace with your actual POST endpoint
    return this.http.post(url, formData);
  }
}