export class questionnaire {

  activity: string;
  experience: string;
  gym: string | null;
  goal: string;
  intensity: string;
  frequency: string;
  gender: string;
  weight: number;
  height: number;
  emailaddress: string;

  constructor(activity, experience, gym, goal, intensity, frequency, gender, weight, height, emailaddress) {
    this.activity = activity,
    this.experience = experience,
    this.gym = gym,
    this.goal = goal,
    this.intensity = intensity,
    this.frequency = frequency,
    this.gender = gender,
    this.weight = weight,
    this.height = height,
    this.emailaddress = emailaddress
  }
}