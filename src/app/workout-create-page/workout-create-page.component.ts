import { Component, Renderer2, ElementRef } from '@angular/core';
import { WorkoutService } from './workout.service'
import { UserService } from '../user.service';


@Component({
  selector: 'app-workout-create-page',
  templateUrl: './workout-create-page.component.html',
  styleUrls: ['./workout-create-page.component.css']
})


export class WorkoutCreatePageComponent {
  constructor(private workoutService: WorkoutService, public userService: UserService) {};
  ngOnInit() {}
  // Variables
  workoutOptions: string[] = ['Chest','Shoulders','Back','Biceps','Triceps','Abs','Legs'];
  workoutLengthOptions: string[] = ['short', 'medium', 'long'];
  selectedWorkoutLength: string = 'short';
  selectedOption1: string = "Chest";
  selectedOption2: string = "";
  selectedOption3: string = "";
  selectedOptionArray: string[] = [];

  individualMuscleContainer: any[] = [];

  workoutName: string = '';
  workoutSets: string = '';
  workoutReps: string = '';
  workoutRest: string = '';
  workoutTarget: string = '';
  workoutLink: string = '';

  generateButtonClicked = false;

  validateSelection(){
    this.selectedOptionArray = [];
    this.selectedOptionArray.push(this.selectedOption1);

    if (this.selectedOption2 !== ""){
      this.selectedOptionArray.push(this.selectedOption2);
    }

    if (this.selectedWorkoutLength !== "short"){
      if (this.selectedOption3 !== ""){
        this.selectedOptionArray.push(this.selectedOption3)
      }
    }
  }

  generateWorkout(){
    this.validateSelection();

    this.workoutService.getGenerateWorkout(this.selectedOptionArray, this.selectedWorkoutLength, 'andrew').subscribe(response => {
      response.forEach((data, index) => {
        this.individualMuscleContainer.push([
          this.workoutName = data[1],
          this.workoutSets = data[2],
          this.workoutReps = data[3],
          this.workoutRest = data[4],
          this.workoutTarget = data[5],
          this.workoutLink = data[6],
        ]);
      })
      this.generateButtonClicked = true;
      console.log(this.userService.getUser());
      }, error => {
      console.error(error);
    });
  }

}
