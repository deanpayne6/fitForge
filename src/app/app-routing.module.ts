// Luis 08/28/23 - Created register page and worked on it

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InitalLoginPageComponent } from './inital-login-page/inital-login-page.component';
import { CreateAccountPageComponent } from './create-account-page/create-account-page/create-account-page.component';
import { QuestionnairePageComponent } from './questionnaire-page/questionnaire-page.component';
import { HomeComponent } from './home/home.component';
import { WorkoutCreatePageComponent } from './workout-create-page/workout-create-page.component';
import { WorkoutRatingComponent } from './workout-rating/workout-rating.component';
import { WorkoutLogComponent } from './workout-log/workout-log.component';
import { StartDailyWorkoutComponent } from './start-daily-workout/start-daily-workout.component';
import { AuthGuard } from './auth.guard';
import { RecoverPasswordComponent } from './recover-password/recover-password.component';
const routes: Routes = [
  {path: '', component: InitalLoginPageComponent},
  {path: 'login', component: InitalLoginPageComponent},
  {path: 'register', component: CreateAccountPageComponent},
  {path: 'userquestionnaire', component: QuestionnairePageComponent, canActivate: [AuthGuard]},
  {path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
  {path: 'createWorkout', component:WorkoutCreatePageComponent, canActivate: [AuthGuard]},
  {path: 'workoutrating', component:WorkoutRatingComponent, canActivate: [AuthGuard]},
  {path: 'workoutlog', component:WorkoutLogComponent, canActivate: [AuthGuard]},
  {path: 'startWorkout', component:StartDailyWorkoutComponent, canActivate: [AuthGuard]},
  {path: 'recovery', component: RecoverPasswordComponent},
  {path: '**', component: HomeComponent},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
