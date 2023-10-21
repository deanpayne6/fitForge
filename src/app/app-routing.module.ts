// Luis 08/28/23 - Created register page and worked on it

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InitalLoginPageComponent } from './inital-login-page/inital-login-page.component';
import { CreateAccountPageComponent } from './create-account-page/create-account-page/create-account-page.component';
import { AboutPageComponent } from './about-page/about-page.component';
import { QuestionnairePageComponent } from './questionnaire-page/questionnaire-page.component';
import { HomeComponent } from './home/home.component';
import { WorkoutCreatePageComponent } from './workout-create-page/workout-create-page.component';
import { WorkoutRatingComponent } from './workout-rating/workout-rating.component';
import { WorkoutLogComponent } from './workout-log/workout-log.component';

const routes: Routes = [
  {path: '', component: InitalLoginPageComponent},
  {path: 'register', component: CreateAccountPageComponent},
  {path: 'about', component: AboutPageComponent},
  {path: 'userquestionnaire', component: QuestionnairePageComponent},
  {path: 'home', component: HomeComponent},
  {path: 'createWorkout', component:WorkoutCreatePageComponent},
  {path: 'workoutrating', component:WorkoutRatingComponent},
  {path: 'workoutlog', component:WorkoutLogComponent},
  {path: "**", component: HomeComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
