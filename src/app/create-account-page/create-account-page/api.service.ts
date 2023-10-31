import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UrlService } from 'src/app/url.service';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient, public urlService: UrlService) {}

  checkEmailAvailability(email: string): Observable<{ exists: boolean }> {
    const url = this.urlService.getUrl() + `/checkEmailAvailability?email=${email}`;
    return this.http.get<{ exists: boolean }>(url);
  }

  checkUsernameAvailability(username: string): Observable<{ exists: boolean }> {
    const url = this.urlService.getUrl() + `/checkUsernameAvailability?username=${username}`;
    return this.http.get<{ exists: boolean }>(url);
  }

  // Dean copy this one
  sendPostRequest(formData: any): Observable<any> {
    const url = this.urlService.getUrl() + '/auth/register';
    return this.http.post(url, formData);
  }
}