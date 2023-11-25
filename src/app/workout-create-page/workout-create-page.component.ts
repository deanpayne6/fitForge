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
  ngOnInit() {
    this.checkForPrexistingWeeklyWorkouts();
  }

  constructor(private workoutService: WorkoutService, public userService: UserService, private router: Router) {
    this.generateFormattedDates();
  };
 
  formattedDates: string[] = [];

  getDayName(dateString: string): string {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const date = new Date(dateString);
    return days[date.getDay()];
  }


  // saving the username
  username: string = this.userService.getUser().username;

  
  // this is for finding out how many workouts the user wants and for generating tabs for number of days wanted
  startButtonClicked: boolean = false;
  workoutDays: number[] = [1,2,3,4,5,6,7];
  workoutDaysData: any[] = [[],[],[],[],[],[],[]];
  
  checkForPrexistingWeeklyWorkouts() {
    this.workoutService.getExistingWeeklyWorkoutInfomation(this.username).subscribe(response => {
      response.forEach((data, index) => {
          this.workoutDaysData[index] = (data);
      });

      console.log("This is the existing workout data: ", this.workoutDaysData);

      // Emit the updated data to notify the child components
      this.workoutDataUpdated.emit(this.workoutDaysData);
    }, error => {
      console.error(error);
    });
  }

  updateWorkoutDaysData(index: number, data: any) {
    this.workoutDaysData[index] = data;
  }

  showContainer(){
    console.log(this.workoutDaysData);
  }

  acceptWorkout(){
    console.log("Accept workout button clicked!");

    
  
    this.workoutService.sendWorkoutInformation(this.workoutDaysData, this.username).subscribe(response => {
      console.log(response);
      }, error => {
      console.error(error);
    });

    this.router.navigate(['/home'])
  };

  private generateFormattedDates() {
    const currentDate = new Date();

    this.formattedDates = this.workoutDays.map((_, index) => {
      const date = new Date(currentDate);
      date.setDate(currentDate.getDate() + index);
      return formatDate(date, 'MM-dd-yy', 'en-US');
    });
  };

}