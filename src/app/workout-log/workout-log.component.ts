import { Component } from '@angular/core';

@Component({
  selector: 'app-workout-log',
  templateUrl: './workout-log.component.html',
  styleUrls: ['./workout-log.component.css']
})
export class WorkoutLogComponent {
  currentDate = new Date();

  getCurrentDayOfWeek(): string {
    const daysOfTheWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const dayOfTheWeek = this.currentDate.getDay();

    return daysOfTheWeek[dayOfTheWeek];
  }

}
