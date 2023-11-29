import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { ApiService } from './api.service';

@Component({
  selector: 'app-workout-rating',
  templateUrl: './workout-rating.component.html',
  styleUrls: ['./workout-rating.component.css']
})
export class WorkoutRatingComponent {
  currentDate = new Date();

  getCurrentDayOfWeek(): string {
    const daysOfTheWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const dayOfTheWeek = this.currentDate.getDay();

    return daysOfTheWeek[dayOfTheWeek];
  }

  constructor(private apiService: ApiService, public userService: UserService) {};

  // getting username
  username: string = this.userService.getUser().username;

  // an array that keeps track of the workout log items, easier to sort into divs
  dailyWorkoutListItem: any[] = [];

  // helper function to format the dates
  formatDate(date: Date): string{
    return date.toISOString().split('T')[0];
  }

  // creating workout log array using an object
  createDailyWorkoutList(data){
    const object = {
      workoutMuscleGroup: data.workoutMuscleGroup,
      workoutName: data.workoutName,
      workoutSets: data.workoutSets,
      workoutReps: data.workoutReps,
      workoutRest: data.workoutRest,
      workoutTarget: data.workoutTarget,
      workoutLink: data.workoutLink,
    };
    this.dailyWorkoutListItem.push(object);
  }

  // getting workout log data
  getWorkoutLog(){
    this.apiService.getTodaysWorkouts(this.username).subscribe(response => {
      response.forEach((data) => {
        this.createDailyWorkoutList(data);
      })
    }, error => {
      console.error("error fetching the data from the backend",error);
    }
    );
  }

  isLoading = false;

  ngOnInit(){
    this.isLoading = true;
    const delayMS = 1500;
    setTimeout(() =>{
      this.isLoading = false;
      this.getWorkoutLog();
      console.log(this.dailyWorkoutListItem.length);
    }, delayMS);
  }
}
