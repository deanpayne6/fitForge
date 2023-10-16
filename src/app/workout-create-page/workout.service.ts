import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class WorkoutService {
  constructor(private http: HttpClient) {}
  
  private apiUrl = "http://localhost:3200";

  getGenerateWorkout(workoutInput: string, workoutLength: string, username: string):Observable<any>{
    

    const params = {
      workoutInput,
      workoutLength,
      username
    };

    return this.http.get<{ data: any }>(`${this.apiUrl}/generateWorkout`, { params });
    
    // const params = new HttpParams()
    //   .set('workoutInput', workoutInput)
    //   .set('workoutLength', workoutLength)
    //   .set('username', username);

    // const headers = new HttpHeaders({
    //   'Content-Type': 'application/json',
    // });

    // return this.http.get(`${this.apiUrl}/generateWorkout`, { params, headers });
  }

  }
