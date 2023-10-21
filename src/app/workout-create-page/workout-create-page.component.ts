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

  // display options for workouts, lengths
  workoutOptions: string[] = ['Chest','Shoulders','Back','Biceps','Triceps','Abs','Legs'];
  workoutLengthOptions: string[] = ['short', 'medium', 'long'];
  // default options so the user can not accidentally click generate without inputs, other inputs can be empty
  selectedWorkoutLength: string = 'short';
  selectedOption1: string = "Chest";
  selectedOption2: string = "";
  selectedOption3: string = "";
  
  //array used for sending options to backend 
  selectedOptionArray: string[] = [];

  //this is an array that keeps track of the individual workout divs, allows for easy access of the divs
  individualMuscleContainer: any[] = [];

  // variables used for the creation of the object inside of each individualMuscleContainter
  workoutName: string = '';
  workoutSets: string = '';
  workoutReps: string = '';
  workoutRest: string = '';
  workoutTarget: string = '';
  workoutLink: string = '';

  // these options are for the when the edit button is clicked
  editDivVisible: boolean = false;
  workoutNameDisplay: string = '';
  
  // this is to remove the generate button after it was has been clicked.
  generateButtonClicked = false;

  // this is being used to keep track of the index of the selected edited div
  selectedIndex:number;

  // this function is meant to valdiate the user options, ensures that no empty strings are passed to the backend
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

  // this is the function actually generating the workouts
  generateWorkout(){
    // calling the validating function
    this.validateSelection();

    // calling the workout service to make a call to the backend, pushed the data onto the individualMuscleContainer div, with neccesary info
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
      // this makes the generated button disappear when clicked
      this.generateButtonClicked = true;
      // THIS LOG DOES NOT WORK!!!! - ALEX FIX
      console.log(this.userService.getUser());
      }, error => {
      console.error(error);
    });
  }

  // function happens when the edit button is clicked, Shows selected workout, blurs out the background, and saves the selected index
  showEditDiv(index: number) {
    this.editDivVisible = true;
    this.workoutNameDisplay = this.individualMuscleContainer[index][0];
    this.selectedIndex = index;
  }

  // just cancles the edit page
  cancelEditWorkout() {
      this.editDivVisible = false;
  }

  // deletes the div that was selected
  deleteWorkout(){
    this.individualMuscleContainer.splice(this.selectedIndex, 1);
    this.editDivVisible = false;
  }

}
