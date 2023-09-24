import { Component, Renderer2, ElementRef } from '@angular/core';


@Component({
  selector: 'app-workout-create-page',
  templateUrl: './workout-create-page.component.html',
  styleUrls: ['./workout-create-page.component.css']
})


export class WorkoutCreatePageComponent {
  workoutOptions: string[] = ['Option 1', 'Option 2', 'Option 3']; // Add your dynamic options here
  muscleGroupContainers: string[] = [];

  selectedOption: string = ''; // Variable to store the selected option

  createMuscleGroupContainer() {
    this.muscleGroupContainers.push(this.selectedOption);
  }
}
