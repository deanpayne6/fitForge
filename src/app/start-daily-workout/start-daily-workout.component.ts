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
  displayDailyWorkout: boolean = false;
  displayDailyWorkoutButton: boolean = false;
  displayMessage:boolean = false;
  message:string = "Hey there big fella, you have already completed your daily workout, rest until tomorrow";
  dailyWorkoutData: any[]= [];
  currentWorkoutIndex: number = 0;
  totalWorkouts: number = 0;
  
  ngOnInit() {
    this.dailyService.getDailyWorkoutStatus(this.username).subscribe(
      response => {
        console.log(response);
        this.workoutStatusNumber = response;
        // this.workoutStatusNumber = -1;
        if (this.workoutStatusNumber === -1){
          this.displayDailyWorkout = false;
          this.displayDailyWorkoutButton = false;
          this.displayMessage = true;
        }else if (this.workoutStatusNumber === 0) {
          this.router.navigate(['/createWorkout']);
        }else if (this.workoutStatusNumber === 1) {
          this.displayDailyWorkout = false;
          this.displayDailyWorkoutButton = true;
          this.displayMessage = false;
        }
      },
      error => {
        console.error(error);
      }
      );
    }

    createWorkouts(data){
      const object = {
        workoutMuscleGroup: data.workoutMuscleGroup,
        workoutName: data.workoutName,
        workoutSets: data.workoutSets,
        workoutReps: data.workoutReps,
        workoutRest: data.workoutRest,
        workoutTarget: data.workoutTarget,
        workoutLink: data.workoutLink,
      };
      this.dailyWorkoutData.push(object);
    };

  startDailyWorkout(){
    this.dailyService.getDailyWorkouts(this.username).subscribe(response => {
      response.forEach((data, index) => {
        this.createWorkouts(data);
        this.totalWorkouts++;
      });
    }, error => {
      console.error(error);
    });
    this.displayDailyWorkoutButton = false;
    this.displayDailyWorkout = true;
  }

  showNextWorkout() {
    if (this.currentWorkoutIndex < this.dailyWorkoutData.length - 1) {
      this.currentWorkoutIndex++;
    }
  }

  showPreviousWorkout() {
    if (this.currentWorkoutIndex > 0) {
      this.currentWorkoutIndex--;
    }
  }

  finishWorkout(){
    this.router.navigate(['/workoutrating']);
  }

  showList(){
    console.log(this.dailyWorkoutData)
  }
}
