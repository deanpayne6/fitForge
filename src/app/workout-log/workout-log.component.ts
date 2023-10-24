import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { ApiService } from './api.service';


@Component({
  selector: 'app-workout-log',
  templateUrl: './workout-log.component.html',
  styleUrls: ['./workout-log.component.css']
})
export class WorkoutLogComponent {
  currentDate = new Date();

  getCurrentDayOfWeek(): string {
    const daysOfTheWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const dayOfTheWeek = this.currentDate.getDay();

    return daysOfTheWeek[dayOfTheWeek];
  }

  constructor(private apiService: ApiService, public userService: UserService) {};

  // getting username
  username: string = this.userService.getUser().username;

  // array of dates
  private recentDates = ["2023-10-24", "2023-10-23", "2023-10-22"];

  // an array that keeps track of the workout log items, easier to sort into divs
  workoutLogItem: any[] = [];

  // creating workout log array using an object
  createWorkoutLog(data){
    const workoutLogObject = {
      workoutName: data.workoutName,
      workoutMuscleGroup: data.workoutMuscleGroup,
      workoutSets: data.workoutSets,
      workoutReps: data.workoutReps,
      workoutRest: data.workoutRest,
      workoutRPE: data.workoutRPE
    };
    this.workoutLogItem.push(workoutLogObject);
    console.log(this.workoutLogItem);
  }

  // getting workout log data
  getWorkoutLog(){
    console.log(this.username);
    console.log("getting workout log data");

    this.apiService.getWorkoutLogData(this.username, this.recentDates).subscribe(reponse => {
      reponse.forEach((data) => {
        this.createWorkoutLog(data);
        console.log(data);
      } )
    }, error => {
      console.error(error);
    }
    );
  }
}
