import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) {}

  private apiUrl = "http://localhost:3200";

  getWorkoutLogData(username: string, dateRequested: any): Observable<any> {
    const body = {
      username,
      dateRequested
    }

    return this.http.post<{ data: any }>(`${this.apiUrl}/workoutLog`, body);
  }
}
