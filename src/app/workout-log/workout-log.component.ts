import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { ApiService } from './api.service';

@Component({
  selector: 'app-workout-log',
  templateUrl: './workout-log.component.html',
  styleUrls: ['./workout-log.component.css']
})
export class WorkoutLogComponent {

  todaysDate = new Date();
  currentDate = new Date();
  precedingDate = new Date();
  succeedingDate = new Date();


  getCurrentDayOfWeek(): string {
    const daysOfTheWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const dayOfTheWeek = this.currentDate.getDay();

    return daysOfTheWeek[dayOfTheWeek];
  }

  constructor(private apiService: ApiService, public userService: UserService) {};

  // getting username
  username: string = this.userService.getUser().username;

  // an array that keeps track of the workout log items, easier to sort into divs
  workoutLogItem: any[] = [];

  // andrew told me to make this
  //      -> it turns out this array was completely useless                                                                                     jk andrew it was very useful
  // workoutLogItem2: any[] = [];

  // helper function to format the dates
  formatDate(date: Date): string{
    return date.toISOString().split('T')[0];
  }

  // creating workout log array using an object
  createWorkoutLog(data){
    const object = {
      workoutName: data.workoutName,
      workoutMuscleGroup: data.workoutMuscleGroup,
      workoutSets: data.workoutSets,
      workoutReps: data.workoutReps,
      workoutRest: data.workoutRest,
      workoutRpe: data.workoutRpe
    };
    this.workoutLogItem.push(object);
  }

  // getting workout log data
  getWorkoutLog(){
    this.apiService.getWorkoutLogData(this.username, this.formatDate(this.currentDate)).subscribe(response => {
      this.workoutLogItem = [];
      response.forEach((data) => {
        this.createWorkoutLog(data);
      })
      this.findFocusedMuscleGroups();
      if(this.workoutLogItem.length === 0 && !this.isFutureDate){ this.isEmptyLog = true; this.focusedMuscleGroups = [];}
      else{ this.isEmptyLog = false; }
    }, error => {
      console.error("error fetching the data from the backend",error);
    }
    );
  }

  // bool for spinner
  isLoading = false;

  // pull today's workout information
  ngOnInit(): void{
    this.isLoading = true;
    const delayMS = 2000;
    setTimeout(() =>{
      this.isLoading = false;
      this.getWorkoutLog();
      console.log(this.workoutLogItem.length);
      console.log(this.formatDate(this.currentDate), this.formatDate(this.todaysDate), this.isEmptyLog);
    }, delayMS);
    //this.getWorkoutLog();

    
  }

  // initializing the array for muscle groups
  focusedMuscleGroups: string[] = [];

  // find the muscle groups focused in the workout
  findFocusedMuscleGroups(): void{
    // checking to make sure the workout log for the day isn't empty
    if(this.workoutLogItem.length > 0){

      // adding the first muscle group in for our comparisons
      this.focusedMuscleGroups.push(this.workoutLogItem[0].workoutMuscleGroup);

      // for loop to go through each muscle group
      for( let i = 0; i < this.workoutLogItem.length; i++){

        // checking to see if the current muscle group is already in the array
        if(!this.focusedMuscleGroups.includes(this.workoutLogItem[i].workoutMuscleGroup)){

          // if it isn't already present, push it into the array
          this.focusedMuscleGroups.push(this.workoutLogItem[i].workoutMuscleGroup);
        }
      }
    }
  }

    // initialize boolean variable for the empty log message
  // true = empty log message shown
  // false = workout log information shown
  isEmptyLog = false;

  // initialize boolean variable for the future date message
  // true = future date message shown
  // false = workoutlog information shown
  isFutureDate = false;

  // helper function to get new log data, reset muscle group array, and check for empty workout logs
  afterDayChange(): void{


    // reset the muscle group array and recall it
    this.focusedMuscleGroups = [];
    this.findFocusedMuscleGroups();

    console.log("ADC. func. post-getting musclegroup workout item",this.workoutLogItem);


    // looking at a future date
    //      -> change future date to true
    // otherwise, we are not looking at a future date
    //      -> set future date to false

    if(this.currentDate > this.todaysDate){
      
      this.isFutureDate = true;

    }else{

      this.isFutureDate = false;

    }

    // check to see if the array is populated and we are not viewing a future date
    //        -> set empty log variable to false
    // otherwise check to see if the array is empty and we are not looking at a future date
    //        -> set empty log variable to true


    // if( ((this.workoutLogItem.length > 0) && (!this.isFutureDate)) || ((this.isFutureDate)) ){
      
    //   this.isEmptyLog = false;

    // }else if( (this.workoutLogItem.length > 1) && (this.currentDate <= this.todaysDate)){
    //   this.isEmptyLog = true;
    // }
    console.log("===================");
    // console.log("Future Date? ", this.isFutureDate);
    // console.log("empty log?", this.isEmptyLog);
    // console.log("Is the log actually empty?", this.workoutLogItem.length);
    // console.log("Current Date:", this.currentDate, "\nToday's Date:", this.todaysDate);
    // console.log(this.workoutLogItem);
  }

  // get workout information for the day before the current date
  precedingDayLog(): void{

    // get the preceding date
    // this.precedingDate = new Date();
    this.precedingDate.setDate(this.currentDate.getDate() - 1);

    console.log("-----------------", this.formatDate(this.currentDate), "=>", this.formatDate(this.precedingDate), "-----------------");


    // update the new current date
    this.currentDate = this.precedingDate;

    console.log("prec. func. pre-afterdaychange workout item",this.workoutLogItem);

    // get new workoutlog for new day
    this.getWorkoutLog();
    console.log("prec. func. post-getting new workoutlog workout item",this.workoutLogItem);

    this.afterDayChange();

  }

  // get workout information for the day after the current date
  succeedingDayLog(): void{

    // get the succeeding date
    this.succeedingDate.setDate(this.currentDate.getDate() + 1);

    // update the new current date
    this.currentDate = this.succeedingDate;
    console.log("succ. func. pre-afterdaychange workout item",this.workoutLogItem);

    // get new workoutlog for new day
    this.getWorkoutLog();
    console.log("succ. func. post-getting new workoutlog workout item",this.workoutLogItem);
    
    // call the helper function
    this.afterDayChange();

    }
  
}
