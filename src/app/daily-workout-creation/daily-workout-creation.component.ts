import { Component, EventEmitter, Output, Input, OnInit} from '@angular/core';
import { DailyWorkoutService } from './daily-workout.service';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-daily-workout-creation',
  templateUrl: './daily-workout-creation.component.html',
  styleUrls: ['./daily-workout-creation.component.css']
})
export class DailyWorkoutCreationComponent {
  @Input() initialWorkoutArray: any[] = [];
  @Output() dataUpdated: EventEmitter<any> = new EventEmitter();
  constructor(
    private workoutService: DailyWorkoutService, 
    public userService: UserService, 
    private router: Router,
    public authService: AuthService) {};
  ngOnInit() {
    if(!this.authService.isLoggedIn()) {
      this.router.navigate(['/login'])
    }
  };

  // saving the username
  username: string = this.userService.getUser().username;

  // display options for workouts, lengths
  workoutOptions: string[] = ['Chest','Shoulders','Back','Biceps','Triceps','Abs','Legs'];
  workoutLengthOptions: string[] = ['Short', 'Medium', 'Long'];

  // default options so the user can not accidentally click generate without inputs, other inputs can be empty
  selectedWorkoutLength: string = 'Short';
  selectedOption1: string = "Chest";
  selectedOption2: string = "";
  selectedOption3: string = "";
  
  //array used for sending options to backend 
  selectedOptionArray: string[] = [];

  //this is an array that keeps track of the individual workout divs, allows for easy access of the divs
  individualMuscleContainer: any[] = [];

  // these options are for the when the edit button is clicked
  editDivVisible: boolean = false;
  workoutNameDisplay: string = '';

  // options for selecting new workout
  newWorkoutDivVisible: boolean = false;
  newSelectedWorkoutName: string = "";
  newWorkoutsReturnedArray: string[] = [];
  
  // this is to remove the generate button after it was has been clicked.
  generateButtonClicked = false;

  // this is being used to keep track of the index of the selected edited div
  selectedDivIndex:number;


  // ----------> HELPER FUNCTIONS <----------
  // this function is meant to see what options to push onto the backend for workouts
  validateSelection(){
    this.selectedOptionArray = [];
    this.selectedOptionArray.push(this.selectedOption1);

    if (this.selectedOption2 !== ""){
      this.selectedOptionArray.push(this.selectedOption2);
    }

    if (this.selectedWorkoutLength !== "Short"){
      if (this.selectedOption3 !== ""){
        this.selectedOptionArray.push(this.selectedOption3);
      }
    }
  };

  // creating workout array with the use of an object
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
    this.individualMuscleContainer.push(object);
  };

  // checking if workouts are empty
  isWorkoutListEmpty(){
    if (this.individualMuscleContainer.length === 0){
      this.generateButtonClicked = false;
      this.selectedOption1 = "Chest";
      this.selectedOption2 = "";
      this.selectedOption3 = "";
      this.selectedWorkoutLength = 'Short';
    }
  };

  // ----------> MAIN FUNCTIONS <----------
  // this function fills the individualWorkout with given array
  setUpComponentWithArray(initialWorkoutArray:any[]){
    this.individualMuscleContainer = [];
    initialWorkoutArray.forEach((data, index) => {
      this.createWorkouts(data);
    });

    console.log("the following is the passed data ", this.individualMuscleContainer);
    this.dataUpdated.emit(this.individualMuscleContainer);
    this.generateButtonClicked = true;
  }


  // this is the function actually generating the workouts
  generateWorkout(){
    console.log("generate workout button clicked!");
    // calling the validating function
    this.validateSelection();
    // calling the workout service to make a call to the backend, pushed the data onto the individualMuscleContainer div, with neccesary info
    this.workoutService.getGenerateWorkout(this.selectedOptionArray, this.selectedWorkoutLength, this.username).subscribe(response => {
      response.forEach((data, index) => {
        this.createWorkouts(data);
      })
      this.dataUpdated.emit(this.individualMuscleContainer);
      this.generateButtonClicked = true;
      }, error => {
      console.error(error);
    });
  };

  // function is meant for the edit button, shows editing div, sets the display name, and saves the index for use across entire file
  showEditDiv(index: number) {
    console.log("edit button clicked!");
    this.editDivVisible = true;
    this.workoutNameDisplay = this.individualMuscleContainer[index].workoutName;
    this.selectedDivIndex = index;
  };

  // cancel button, redisplays the workout on page
  cancelEditWorkout() {
    console.log("cancel button clicked!");
      this.editDivVisible = false;
      this.newWorkoutDivVisible = false;
      this.newWorkoutsReturnedArray = [];
  };

  // deletes the div that was selected, also resets the generate workout incase all workouts are deleted
  deleteWorkout(){
    console.log("delete button clicked!")
    this.individualMuscleContainer.splice(this.selectedDivIndex, 1);
    this.editDivVisible = false;

    this.isWorkoutListEmpty();
  };

  // function meant to get new workouts when the swap button is clicked, makes call to backend
  getNewWorkouts(){
    console.log("swap button clicked!")
    this.editDivVisible = false;
    this.newWorkoutDivVisible = true;

    this.workoutService.getNewWorkoutNames(this.individualMuscleContainer, this.workoutNameDisplay, this.username).subscribe(response => {
      this.newWorkoutsReturnedArray = response.slice();
      this.newSelectedWorkoutName = this.newWorkoutsReturnedArray[0];
      }, error => {
      console.error(error);
    });
  };

  // function for the confirming of swapping workout, sends new workoutList to the end backend
  confirmNewWorkout() {
    this.workoutService.getUpdatedWorkout(this.individualMuscleContainer, this.newSelectedWorkoutName, this.selectedDivIndex, this.username).subscribe(response => {
      this.individualMuscleContainer = [];
      response.forEach((data, index) => {
        this.createWorkouts(data);
      });
      this.dataUpdated.emit(this.individualMuscleContainer);
      this.cancelEditWorkout();
    }, error => {
      console.error(error);
    });
  }
  
  // function for the regenerate button
  regenerateWorkout(){
    console.log("regenerate workout button clicked!")
    this.generateButtonClicked = false;
    this.individualMuscleContainer =[];
    this.isWorkoutListEmpty();
    this.dataUpdated.emit(this.individualMuscleContainer);
  };

  // listen for the event from the parent component
  @Input() set workoutData(data: any[]) {
    if (data && data.length > 0) {
      this.individualMuscleContainer = data;
      this.generateButtonClicked = true;
    };
  }
}
