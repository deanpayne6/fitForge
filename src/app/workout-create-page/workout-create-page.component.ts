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
  individualExerciseOptions: string[] = [];
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

  constructor(private workoutService: WorkoutService) {}

  ngOnInit() {}

  getWorkout() {

    console.log(this.selectedOption1)
    console.log(this.selectedOption2)
    console.log(this.selectedOption3)
    if (this.selectedWorkoutLength === 'short'){
      if (this.selectedOption1 !== ''){
        this.selectedWorkoutArray.push(this.selectedOption1);
      }
      if (this.selectedOption2 !== ''){
        this.selectedWorkoutArray.push(this.selectedOption2)
      }
    } else {
      if (this.selectedOption1 !== ''){
        this.selectedWorkoutArray.push(this.selectedOption1);
      }
      if (this.selectedOption2 !== ''){
        this.selectedWorkoutArray.push(this.selectedOption2)
      }
      if (this.selectedOption3 !== ''){
        this.selectedWorkoutArray.push(this.selectedOption3)
      }
    }

    console.log(this.selectedWorkoutArray)
    

    // Example usage
    this.workoutService.getGenerateWorkout (this.selectedWorkoutArray, this.selectedWorkoutLength, 'andrew').subscribe(response => {
      console.log(response);
    }, error => {
      console.error(error);
    });
  }

  createMuscleGroupContainer() {
    this.muscleGroupContainers.push({ option: this.selectedOption, individualWorkouts: [] });
  }

  addExercise(mainContainer: any) {
    mainContainer.individualWorkouts.push({});
  }

  removeExercise(mainContainer: any, index: number) {
    mainContainer.individualWorkouts.splice(index, 1);
  }
}
