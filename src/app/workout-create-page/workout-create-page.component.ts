import { Component, Renderer2, ElementRef } from '@angular/core';
import { WorkoutService } from './workout.service'


@Component({
  selector: 'app-workout-create-page',
  templateUrl: './workout-create-page.component.html',
  styleUrls: ['./workout-create-page.component.css']
})


export class WorkoutCreatePageComponent {
  workoutOptions: string[] = ['Option 1', 'Option 2', 'Option 3'];
  muscleGroupContainers: { option: string, individualWorkouts: any[] }[] = [];
  selectedOption: string = '';
  dropdownOptions: string[] = [];

  constructor(private workoutService: WorkoutService) {}

  ngOnInit() {
    this.workoutService.getDropdownOptions().subscribe((options) => {
      this.dropdownOptions = options;
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
