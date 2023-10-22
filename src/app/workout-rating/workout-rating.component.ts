import { Component } from '@angular/core';

@Component({
  selector: 'app-workout-rating',
  templateUrl: './workout-rating.component.html',
  styleUrls: ['./workout-rating.component.css']
})
export class WorkoutRatingComponent {
  currentDate = new Date();

  getCurrentDayOfWeek(): string {
    const daysOfTheWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const dayOfTheWeek = this.currentDate.getDay();

    return daysOfTheWeek[dayOfTheWeek];
  }
}
