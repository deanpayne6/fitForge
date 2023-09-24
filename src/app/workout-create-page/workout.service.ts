import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class WorkoutService {

  constructor(private http: HttpClient) {}
  getDropdownOptions(): Observable<string[]> {
    return this.http.get<string[]>('https://api.example.com/options');
  }

}
