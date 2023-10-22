import { Component } from '@angular/core';
import { ApiService } from './api.service';
import { UserService } from '../user.service';
import { questionnaire } from '../models/questionnaire';
import { Router } from '@angular/router';

@Component({
  selector: 'app-questionnaire-page',
  templateUrl: './questionnaire-page.component.html',
  styleUrls: ['./questionnaire-page.component.css']
})
export class QuestionnairePageComponent {
  constructor (private apiService: ApiService, public userService: UserService, private router: Router) {};

  current_user = this.userService.getUser();

  selectedActivityLevel: string = '';
  activityLevels: string[] = [
    'Sedentary', 
    'Lightly Active', 
    'Moderately Active', 
    'Very Active', 
    'Extremely Active'
  ];

  selectedExperience: string = '';
  experiences: string[] = ['Beginner', 'Intermediate', 'Expert'];

  selectedGymEquipment: string = '';
  // equipmentLevels: string[] = ['Home Gym (Body Weight)', 'Home Gym (Free Weights)', 'Home Gym (Mixed Equipment)', 'Community or Outdoor Gym', 'Commercial Gym'];
  equipmentLevels: string[] = ['No Gym', 'Home Gym or Limited Equipment', 'Commercial Gym'];


  selectedGoal: string = '';
  userGoals: string[] = ['Weight Loss', 'Muscle Building (Hypertrophy)', 'Strength and Power'];

  selectedIntensity: string = '';
  intensities: string[] = ['Light', 'Moderate', 'Intense'];

  selectedFrequency: string = '';
  userFrequencies: string[] = ['Less than 3 times a week', '3-5 times a week', '6-7 times a week'];

  hasData: boolean = false;

  toggleDataEntry(){
    this.hasData = !this.hasData;
  };

  feetHeightModel = { feet: null };
  feetInputValue: number;

  validateHeightFeetInput(){
    const min = 4;
    const max = 7;

    if(isNaN(this.feetInputValue) || this.feetInputValue < min){
      this.feetInputValue = min;
    } else if(this.feetInputValue > max){
      this.feetInputValue = max;

    }
    
  }

  inchesHeightModel = { inches: null };
  inchesInputValue: number;

  validateHeightInchesInput(){
    const min = 0;
    const max = 11;

    if(isNaN(this.inchesInputValue) || this.inchesInputValue < min){
      this.inchesInputValue = min;
    } else if(this.inchesInputValue > max){
      this.inchesInputValue = max;

    }
    
  }

  poundsModel  = { weight: null };
  poundsInputValue: number;

  validateWeightInput(){
    const min = 50;
    const max = 700;

    if(isNaN(this.poundsInputValue) || this.poundsInputValue < min){
      this.poundsInputValue = min;
    } else if(this.poundsInputValue > max){
      this.poundsInputValue = max;

    }
    
  }

  submit() {

    const height_inches = (this.feetInputValue * 12) + this.inchesInputValue;

    const formData = {
      activity: this.selectedActivityLevel,
      experience: this.selectedExperience,
      gym: this.selectedGymEquipment,
      goal: this.selectedGoal,
      intensity: this.selectedIntensity,
      frequency: this.selectedFrequency,
      gender: 'NB',
      height: height_inches,
      weight: this.poundsInputValue,
      emailaddress: this.current_user.email
    }

    this.apiService.sendPostRequest(formData).subscribe(
      (response) => {
        if (response.status === "201") {
          console.log("Registration successful.");
          console.log("Response data:", response.body);
          this.router.navigate(['/home']);
        } else {
          console.error("Registration failed with status code:", response.status);
        }
      },
      (error) => {
        console.error("Registration error:", error);
      }
    );
  }
}