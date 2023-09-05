import { Component } from '@angular/core';

@Component({
  selector: 'app-questionnaire-page',
  templateUrl: './questionnaire-page.component.html',
  styleUrls: ['./questionnaire-page.component.css']
})
export class QuestionnairePageComponent {
  selectedActivityLevel: string = '';
  activityLevels: string[] = ['Sedentary (Little to No Exercise)', 'Lightly Active (Light Exercise or Sports 1-3 Days a Week)', 'Moderately Active (Moderate Exercise or Sports 3-5 Days a Week)', 'Very Active (Hard Exercise or Sports 6-7 Days a Week)', 'Extremely Active (Very Strenuous Exercise, Physical Job, or Training Twice a Day)'];

  selectedExperience: string = '';
  experiences: string[] = ['Beginner', 'Intermediate', 'Expert'];

  selectedGymEquipment: string = '';
  equipmentLevels: string[] = ['Home Gym (Body Weight)', 'Home Gym (Free Weights)', 'Home Gym (Mixed Equipment)', 'Community or Outdoor Gym', 'Commercial Gym'];

  selectedGoal: string = '';
  userGoals: string[] = ['Weight Loss', 'Muscle Building (Hypertrophy)', 'Strength and Power'];

  selectedIntensity: string = '';
  intensities: string[] = ['Light', 'Moderate', 'Intense'];

  hasData: boolean = false;

  toggleDataEntry(){
    this.hasData = !this.hasData;
  };

}
