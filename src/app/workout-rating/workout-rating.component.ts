import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { ApiService } from './api.service';
import { IgcRatingComponent, defineComponents } from 'igniteui-webcomponents';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

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

  constructor(
    private apiService: ApiService, 
    public userService: UserService, 
    private router: Router,
    public authService: AuthService
  ) {};

  

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

  // function to track when the user changes the rating
  public ratingChanged(event: CustomEvent, workoutName: string) {

    // for loop to push rating changes to the array
    for(let workout of this.dailyWorkoutListItem){

      // updating the workout rating based on what workout was rated by the user
      if(workout.workoutName == workoutName){
        workout.workoutRating = event.detail;
      }
    }
  }

  // function to persist the data to the database and redirect user back to the home page
  submitValues(): void{

    // loading spinner to indicate submitting process
    this.isLoading = true;

    // pushing the ratings into the array that we will send to the database
    for(let workout of this.dailyWorkoutListItem){
      this.userRatingsArray.push(workout.workoutRating)
    }

    const delayMS = 1500;
    setTimeout(() => {
      this.isLoading = false;

      // persist data to the database
      this.apiService.submitDailyWorkoutRatings(this.userRatingsArray, this.username).subscribe(response => {
        console.log(response);
      }), error => {
        console.log("There was an error sending the data to the database:\n", error)
      };
  
      // reroute the user to the home page
      this.router.navigate(['/home']);
    })
  
  }
}
