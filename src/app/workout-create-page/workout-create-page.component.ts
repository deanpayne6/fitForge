import { Component} from '@angular/core';
import { WorkoutService } from './workout.service'
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-workout-create-page',
  templateUrl: './workout-create-page.component.html',
  styleUrls: ['./workout-create-page.component.css']
})


export class WorkoutCreatePageComponent {
  constructor(private workoutService: WorkoutService, public userService: UserService, private router: Router) {};
  ngOnInit() {};

  // saving the username
  username: string = this.userService.getUser().username;

  
  // this is for finding out how many workouts the user wants and for generating tabs for number of days wanted
  selectedNumberOfWorkouts:number = 1;
  // numberOfWorkoutsOptions:number[] = [1,2,3,4,5,6,7];
  startButtonClicked: boolean = false;
  workoutDays: number[] = [1,2,3,4,5,6,7];
  workoutDaysData: any[] = [];


  startWorkouts() {
    this.startButtonClicked = true;
    this.generateWorkoutDays();
    this.workoutDaysData = Array.from({ length: this.selectedNumberOfWorkouts }, () => []);
  }

  generateWorkoutDays() {
    this.workoutDays = Array.from({ length: this.selectedNumberOfWorkouts }, (_, i) => i + 1);
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
}