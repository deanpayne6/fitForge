import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UrlService } from '../url.service';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient, public urlService: UrlService) {}

  checkLoginInfo(url: any, formData: any): Observable<any> {
    return this.http.post(url, formData)
  }


  sendPostRequest(formData: any): Observable<any> {
    const url = this.urlService.getUrl() + '/registerInfo'; // Replace with your actual POST endpoint
    return this.http.post(url, formData);
  }
}