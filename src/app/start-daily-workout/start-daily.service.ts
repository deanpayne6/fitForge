import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UrlService } from '../url.service';


@Injectable({
  providedIn: 'root'
})
export class StartDailyService {

  constructor(private http: HttpClient, public urlService: UrlService) { }

  private apiUrl = this.urlService.getUrl();

  getDailyWorkouts(username:string): Observable <any>{
    const body = {
      username,
    }

    return this.http.post<{data: any}>(`${this.apiUrl}/workout/getWorkout`, body)
  }

  getDailyWorkoutStatus(username:string): Observable <any>{
    const body = {
      username,
    }

    return this.http.post<{data: any}>(`${this.apiUrl}/workout/checkWorkout`, body)
  }

}
