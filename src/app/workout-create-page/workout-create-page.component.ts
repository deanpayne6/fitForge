import { Component} from '@angular/core';
import { WorkoutService } from './workout.service'
import { UserService } from '../user.service';


@Component({
  selector: 'app-workout-create-page',
  templateUrl: './workout-create-page.component.html',
  styleUrls: ['./workout-create-page.component.css']
})


export class WorkoutCreatePageComponent {
  constructor(private workoutService: WorkoutService, public userService: UserService) {};
  ngOnInit() {};

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

    if (this.selectedWorkoutLength !== "short"){
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
      this.selectedWorkoutLength = 'short';
    }
  };

  // ----------> MAIN FUNCTIONS <----------
  // this is the function actually generating the workouts
  generateWorkout(){
    console.log("generate workout button clicked!");
    // calling the validating function
    this.validateSelection();
    // calling the workout service to make a call to the backend, pushed the data onto the individualMuscleContainer div, with neccesary info
    this.workoutService.getGenerateWorkout(this.selectedOptionArray, this.selectedWorkoutLength, 'andrew').subscribe(response => {
      response.forEach((data, index) => {
        this.createWorkouts(data);
      })
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

    this.workoutService.getNewWorkoutNames(this.workoutNameDisplay, 'andrew').subscribe(response => {
      this.newWorkoutsReturnedArray = response.slice();
      this.newSelectedWorkoutName = this.newWorkoutsReturnedArray[0];
      }, error => {
      console.error(error);
    });
  };

  // function for the confirming of swapping workout, sends new workoutList to the end backend
  confirmNewWorkout(){
    this.workoutService.getUpdatedWorkout(this.individualMuscleContainer, this.newSelectedWorkoutName, this.selectedDivIndex, 'andrew').subscribe(response => {
      this.individualMuscleContainer = [];
      response.forEach((data, index) => {
        this.createWorkouts(data);
      })
      this.cancelEditWorkout();
      }, error => {
      console.error(error);
    });
  };

  // function for accepting workout, going to send info to the backend
  acceptWorkout(){
    console.log("Accept workout button clicked!");
    let rpeArray = [];

    for (let i = 0; i < this.individualMuscleContainer.length; i ++){
      rpeArray.push(0);
    }

    this.workoutService.sendWorkoutInformation(this.individualMuscleContainer, rpeArray, 'andrew').subscribe(response => {
      
      }, error => {
      console.error(error);
    });
  };

  // function for the regenerate button
  regenerateWorkout(){
    console.log("regenerate workout button clicked!")
    this.generateButtonClicked = false;
    this.individualMuscleContainer =[];
    this.isWorkoutListEmpty();
  };
}