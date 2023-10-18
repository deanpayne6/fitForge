import { Component, Renderer2, ElementRef } from '@angular/core';
import { WorkoutService } from './workout.service'


@Component({
  selector: 'app-workout-create-page',
  templateUrl: './workout-create-page.component.html',
  styleUrls: ['./workout-create-page.component.css']
})


export class WorkoutCreatePageComponent {
  workoutOptions: string[] = ['Bicep','Tricep','Chest','Back','Shoulder','Abs','Legs'];
  muscleGroupContainers: { option: string, individualWorkouts: any[] }[] = [];
  selectedOption: string = '';
  dropdownOptions: string[] = [];
  selectedIndividualWorkoutOption: string = ""
  individualExerciseOptionsString: string = ""

  numOfSets: string = '';
  numOfReps: string = '';
  restTime: string = '';
  weight: string = '';
  target: string = '';
  vidLink: string = '';

  selectedOption1: string = '';
  selectedOption2: string = '';
  selectedOption3: string = '';
  selectedWorkoutLength: string = 'short';
  selectedWorkoutArray: string[] = [];

  numOfSetsArray: string[] = [];
  numOfRepsArray: string[] = [];
  restTimeArray: string[] = [];
  weightArray: string[] = [];
  targetArray: string[] = [];
  vidLinkArray: string[] = [];
  individualExerciseOptionsStringArray: string[] = [];


  constructor(private workoutService: WorkoutService) {}

  ngOnInit() {}

  generateWorkout() {

    if (this.selectedOption1 !== ''){
      this.selectedWorkoutArray.push(this.selectedOption1)
    }
    if (this.selectedOption2 !== ''){
      this.selectedWorkoutArray.push(this.selectedOption2)
    }
    if (this.selectedWorkoutLength !== 'short'){
      if (this.selectedOption3 !== ''){
        this.selectedWorkoutArray.push(this.selectedOption3);
      }
    }

    this.workoutService.getGenerateWorkout(this.selectedWorkoutArray, this.selectedWorkoutLength, 'andrew').subscribe(response => {
      console.log(response);
  
      this.createMuscleGroupContainer();
  
      response.forEach((data, index) => {
        this.addExercise(this.muscleGroupContainers[0], index);
        const i = index * 8;
        this.individualExerciseOptionsStringArray[i] = data[1];
        this.numOfSetsArray[i] = data[2];
        this.numOfRepsArray[i] = data[3];
        this.restTimeArray[i] = data[4];
        this.weightArray[i] = data[5];
        this.targetArray[i] = data[6];
        this.vidLinkArray[i] = data[7];
      });
    }, error => {
      console.error(error);
    });
  }

  createMuscleGroupContainer() {
    this.muscleGroupContainers.push({ option: this.selectedOption, individualWorkouts: [] });
  }

  addExercise(mainContainer: any, index: number) {
    // const index = this.muscleGroupContainers.findIndex(container => container === mainContainer);
    mainContainer.individualWorkouts.push({});
    this.individualExerciseOptionsStringArray[index] = '';
    this.numOfSetsArray[index] = '';
    this.numOfRepsArray[index] = '';
    this.restTimeArray[index] = '';
    this.weightArray[index] = '';
    this.targetArray[index] = '';
    this.vidLinkArray[index] = '';
  }

  removeExercise(mainContainer: any, index: number) {
    mainContainer.individualWorkouts.splice(index, 1);
    this.numOfSetsArray.splice(index, 1);
    this.numOfRepsArray.splice(index, 1);
    this.restTimeArray.splice(index, 1);
    this.weightArray.splice(index, 1);
    this.targetArray.splice(index, 1);
    this.vidLinkArray.splice(index, 1);
  }
}
