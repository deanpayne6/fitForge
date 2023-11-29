import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) {}

  private apiUrl = "http://localhost:3200";

  getTodaysWorkouts(username: string): Observable<any> {
    const body = {
      username
    }

    return this.http.post<{ data: any }>(`${this.apiUrl}/workout/getWorkout`, body);
  }}
