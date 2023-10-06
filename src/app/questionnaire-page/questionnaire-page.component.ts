import { Component } from '@angular/core';
import { ApiService } from './api.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-questionnaire-page',
  templateUrl: './questionnaire-page.component.html',
  styleUrls: ['./questionnaire-page.component.css']
})
export class QuestionnairePageComponent {
  constructor (private apiService: ApiService, public userService: UserService) {};

  current_user = this.userService.getUser();

  selectedActivityLevel: string = '';
  activityLevels: string[] = ['Sedentary (Little to No Exercise)', 'Lightly Active (Light Exercise or Sports 1-3 Days a Week)', 'Moderately Active (Moderate Exercise or Sports 3-5 Days a Week)', 'Very Active (Hard Exercise or Sports 6-7 Days a Week)', 'Extremely Active (Very Strenuous Exercise, Physical Job, or Training Twice a Day)'];

  selectedExperience: string = '';
  experiences: string[] = ['Beginner', 'Intermediate', 'Expert'];

  selectedGymEquipment: string = '';
  // equipmentLevels: string[] = ['Home Gym (Body Weight)', 'Home Gym (Free Weights)', 'Home Gym (Mixed Equipment)', 'Community or Outdoor Gym', 'Commercial Gym'];
  equipmentLevels: string[] = ['No Gym', 'Limited Gym', 'Commercial Gym'];


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
      const formData = {
        activity: this.selectedActivityLevel,
        experience: this.selectedExperience,
        gym: this.selectedGymEquipment,
        goal: this.selectedGoal,
        intensity: this.selectedIntensity,
        frequency: this.selectedFrequency,
      }

      this.apiService.sendPostRequest(formData).subscribe(
        (response) => {
          if (response.status === 200) {
            console.log("Registration successful.");
            console.log("Response data:", response.body);
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