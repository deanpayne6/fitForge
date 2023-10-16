import { Component, Renderer2, ElementRef } from '@angular/core';
import { WorkoutService } from './workout.service'


@Component({
  selector: 'app-workout-create-page',
  templateUrl: './workout-create-page.component.html',
  styleUrls: ['./workout-create-page.component.css']
})


export class WorkoutCreatePageComponent {
  workoutOptions: string[] = ['Bicep','Tricep','Chest','Back','Shoulders','Abs','Legs'];
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

  constructor(private workoutService: WorkoutService) {}

  ngOnInit() {}

  getWorkout() {
    // Example usage
    this.workoutService.getGenerateWorkout ("Tricep", "short", 'andrew').subscribe(response => {
      // Handle the response here
      console.log(response);
    }, error => {
      // Handle errors
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
