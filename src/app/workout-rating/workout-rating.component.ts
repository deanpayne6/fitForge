import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { ApiService } from './api.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IgcRatingComponent, defineComponents } from 'igniteui-webcomponents';

defineComponents(IgcRatingComponent)

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

  constructor(private apiService: ApiService, public userService: UserService, private fb: FormBuilder) {};

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
      workoutName: data.workoutName,
      workoutRating: 0
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
  isLoadingOnSubmit = false;

  ngOnInit(){
    this.isLoading = true;
    const delayMS = 1500;
    setTimeout(() =>{
      this.isLoading = false;
      this.getWorkoutLog();
    }, delayMS);
  }

  userRatingsArray = [];

  public ratingChanged(event: CustomEvent, workoutName: string) {
    for(let workout of this.dailyWorkoutListItem){
      if(workout.workoutName == workoutName){
        workout.workoutRating = event.detail;
        this.userRatingsArray.push(workout.workoutRating);
      }
    }
  }
  submitValues(): void{
    this.apiService.submitDailyWorkoutRatings(this.userRatingsArray, this.username).subscribe(response => {
      console.log(response);
    }), error => {
      console.log("There was an error sending the data to the database:\n", error)
    };

  }
}
