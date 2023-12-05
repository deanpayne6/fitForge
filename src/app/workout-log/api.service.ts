import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UrlService } from '../url.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient, public urlService: UrlService) {}

  private apiUrl = this.urlService.getUrl();

  getWorkoutLogData(username: string, dateRequested: any): Observable<any> {
    const body = {
      username,
      dateRequested
    }

    return this.http.post<{ data: any }>(`${this.apiUrl}/workout/workoutLog`, body);
  }
}
