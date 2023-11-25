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
  constructor(private dailyService: StartDailyService, public userService: UserService, private router: Router) {};
  username: string = this.userService.getUser().username;
  
  workoutStatusNumber: number;
  displayDailyWorkout: boolean;
  message:string = "Hey there big fella, you have already completed your daily workout, rest until tomorrow";
  
  ngOnInit() {
    this.dailyService.getDailyWorkoutStatus(this.username).subscribe(
      response => {
        console.log(response);
        this.workoutStatusNumber = response;
        this.workoutStatusNumber = -1;
        if (this.workoutStatusNumber === -1){
          this.displayDailyWorkout = false;
        }else if (this.workoutStatusNumber === 0) {
          this.router.navigate(['/createWorkout']);
        }else if (this.workoutStatusNumber === 1) {
          this.displayDailyWorkout = true;
        }
      },
      error => {
        console.error(error);
      }
      );
    }
    
  displayNum(){
    console.log(this.workoutStatusNumber);
  }

}
