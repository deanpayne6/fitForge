import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UrlService } from '../url.service';

@Injectable({
  providedIn: 'root'
})
export class WorkoutService {
  constructor(private http: HttpClient, public urlService: UrlService) {}
  
  private apiUrl = this.urlService.getUrl();

  getGenerateWorkout(workoutInput: any, workoutLength: string, username: string): Observable<any> {
    const body = {
      workoutInput,
      workoutLength,
      username
    };

    return this.http.post<{ data: any }>(`${this.apiUrl}/generateWorkout`, body);
  }

  // http://localhost:3200/sendMuscleSwap


  getNewWorkoutNames(workoutName: string, username: string): Observable<any>{
    const body = {
      workoutName,
      username,
    };

    return this.http.post<{data: any}>(`${this.apiUrl}/sendMuscleSwap`, body);
  }

  // updateWorkout
  getUpdatedWorkout(workoutList: any, newWorkout: string, index: number, username: string): Observable <any>{
    const body = {
      workoutList,
      newWorkout,
      index,
      username
    }

    return this.http.post<{data: any}>(`${this.apiUrl}/updateWorkout`, body);
  }

  sendWorkoutInformation(workoutList:any, rpe:any, username: string): Observable <any>{
    const body = {
      workoutList,
      rpe,
      username,
    }

    return this.http.post<{data: any}>(`${this.apiUrl}/submitWorkout`, body)
  }
}