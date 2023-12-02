import { Component, OnInit, EventEmitter} from '@angular/core';
import { WorkoutService } from './workout.service'
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { formatDate } from '@angular/common';
import { DailyWorkoutCreationComponent } from '../daily-workout-creation/daily-workout-creation.component';

@Component({
  selector: 'app-workout-create-page',
  templateUrl: './workout-create-page.component.html',
  styleUrls: ['./workout-create-page.component.css']
})


export class WorkoutCreatePageComponent {
  workoutDataUpdated: EventEmitter<any[]> = new EventEmitter<any[]>();

  constructor(private workoutService: WorkoutService, public userService: UserService, private router: Router) {
    this.generateFormattedDates();
  };
  
  // array to keep track of dates
  formattedDates: string[] = [];
  
  // saving the username
  username: string = this.userService.getUser().username;

  workoutDays: number[] = [1,2,3,4,5,6,7];
  workoutDaysData: any[] = [[],[],[],[],[],[],[]];

  // status variable to force an outcome
  workoutStatusNumber: number;

  // message being displayed if workout was completed for the day.
  workoutStatusMessage: string = 'Sorry buddy, you already too buff for today';

  // init function
  ngOnInit() {
    this.checkForPrexistingWeeklyWorkouts();
    this.workoutService.getDailyWorkoutStatus(this.username).subscribe(
      response => {
        this.workoutStatusNumber = response;
        this.workoutStatusNumber = -1;
        if (this.workoutStatusNumber === -1) {
          console.log(response)
        }
      },
      error => {
        console.error(error);
      }
      );
    }

  
  // this function returns solely the day
  getDayName(dateString: string): string {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const date = new Date(dateString);
    return days[date.getDay()]; //date.getDay returns int, which is why I use days array
  }
  
  // this function makes backend call to see if user already has workouts for certain days
  checkForPrexistingWeeklyWorkouts() {
    this.workoutService.getExistingWeeklyWorkoutInfomation(this.username).subscribe(response => {
      response.forEach((data, index) => {
          this.workoutDaysData[index] = (data);
      });
      // emit the updated data to notify the child components
      this.workoutDataUpdated.emit(this.workoutDaysData);
    }, error => {
      console.error(error);
    });
  }

  // this button is for accepting the workouts
  acceptWorkout(){
    console.log("Accept workout button clicked!");
      
    this.workoutService.sendWorkoutInformation(this.workoutDaysData, this.username).subscribe(response => {
      console.log(response);
      }, error => {
      console.error(error);
    });

    this.router.navigate(['/home'])
  };

  // this formats the date into mm-dd-yy format
  private generateFormattedDates() {
    const currentDate = new Date();
    this.formattedDates = this.workoutDays.map((_, index) => {
      const date = new Date(currentDate);
      date.setDate(currentDate.getDate() + index);
      return formatDate(date, 'MM-dd-yy', 'en-US');
    });
  };

}