import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { StartDailyService } from './start-daily.service';

@Component({
  selector: 'app-start-daily-workout',
  templateUrl: './start-daily-workout.component.html',
  styleUrls: ['./start-daily-workout.component.css']
})
export class StartDailyWorkoutComponent {
  constructor(private dailyServive: StartDailyService, public userService: UserService, private router: Router) {};

  onInit(){
    
  }

}
