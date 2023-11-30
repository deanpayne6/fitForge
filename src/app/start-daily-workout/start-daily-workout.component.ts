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
  
// message being displayed if workout of day is completed
  message:string = "Hey there big fella, you have already completed your daily workout, rest until tomorrow";

  // either displaying the message or the workout info
  displayDailyWorkout: boolean = false;

  // this variable is to force a certain outcome
  workoutStatusNumber: number;

  // container to keep track of data that will be displayed to user
  dailyWorkoutData: any[]= [];

  // index of which workout they are on
  currentWorkoutIndex: number = 0;

  // total number of workouts in the container
  totalWorkouts: number = 0;
  
  // init function to get things started
  ngOnInit() {
    this.dailyService.getDailyWorkoutStatus(this.username).subscribe(
      response => {
        this.workoutStatusNumber = response;
        // this.workoutStatusNumber = -1;
        if (this.workoutStatusNumber === 0) {
          this.router.navigate(['/createWorkout']);
        }else if (this.workoutStatusNumber === 1) {
          this.displayDailyWorkout = true;
          this.startDailyWorkout();
        }
      },
      error => {
        console.error(error);
      }
      );
    }

    // this function is to populate the array to display workouts
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

  // this function does a backend call to get the workouts of the day, also gets the length of the array
  startDailyWorkout(){
    this.dailyService.getDailyWorkouts(this.username).subscribe(response => {
      response.forEach((data, index) => {
        this.createWorkouts(data);
      });
      this.totalWorkouts = response.length;
    }, error => {
      console.error(error);
    });
  }

  // function for the next button
  showNextWorkout() {
    if (this.currentWorkoutIndex < this.dailyWorkoutData.length - 1) {
      this.currentWorkoutIndex++;
    }
  }

  // function for the previous button
  showPreviousWorkout() {
    if (this.currentWorkoutIndex > 0) {
      this.currentWorkoutIndex--;
    }
  }

  // function for the finish button
  finishWorkout(){
    this.router.navigate(['/workoutrating']);
  }
}