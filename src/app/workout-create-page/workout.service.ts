import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class WorkoutService {
  constructor(private http: HttpClient) {}
  
  private apiUrl = "http://localhost:3200";

  getGenerateWorkout(workoutInput: any, workoutLength: string, username: string): Observable<any> {
    const body = {
      workoutInput,
      workoutLength,
      username
    };

    return this.http.post<{ data: any }>(`${this.apiUrl}/generateWorkout`, body);
  }
}