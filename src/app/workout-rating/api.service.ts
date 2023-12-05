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

  getTodaysWorkouts(username: string): Observable<any> {
    const body = {
      username
    }

    return this.http.post<{ data: any }>(`${this.apiUrl}/workout/getWorkout`, body);
  }

  submitDailyWorkoutRatings(rating: any[], username: string): Observable<any>{
    const body = {
      rating,
      username
    }

    return this.http.post<{ data: any}>( `${this.apiUrl}/workout/submitWorkout`, body);
  }
}
