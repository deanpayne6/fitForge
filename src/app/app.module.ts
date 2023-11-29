import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InitalLoginPageComponent } from './inital-login-page/inital-login-page.component';
import { FitforgeLogoComponent } from './fitforge-logo/fitforge-logo.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { ToolbarComponent } from './toolbar/toolbar.component';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import { CreateAccountPageComponent } from './create-account-page/create-account-page/create-account-page.component';
import { HttpClientModule } from '@angular/common/http';
import { QuestionnairePageComponent } from './questionnaire-page/questionnaire-page.component';
import {MatExpansionModule} from '@angular/material/expansion';
import {CdkAccordionModule} from '@angular/cdk/accordion';
import {MatListModule} from '@angular/material/list';
import { FormsModule } from '@angular/forms';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { HomeComponent } from './home/home.component';
import { WorkoutCreatePageComponent } from './workout-create-page/workout-create-page.component';
import { UserService } from './user.service';
import { WorkoutRatingComponent } from './workout-rating/workout-rating.component';
import { WorkoutLogComponent } from './workout-log/workout-log.component';
import { DailyWorkoutCreationComponent } from './daily-workout-creation/daily-workout-creation.component';
import { StartDailyWorkoutComponent } from './start-daily-workout/start-daily-workout.component';






@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [
    AppComponent,
    InitalLoginPageComponent,
    FitforgeLogoComponent,
    ToolbarComponent,
    CreateAccountPageComponent,
    QuestionnairePageComponent,
    HomeComponent,
    WorkoutCreatePageComponent,
    WorkoutRatingComponent,
    WorkoutLogComponent,
    DailyWorkoutCreationComponent,
    StartDailyWorkoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    NoopAnimationsModule,
    MatCardModule,
    MatButtonModule,
    HttpClientModule,
    MatExpansionModule,
    CdkAccordionModule,
    MatListModule,
    FormsModule,
    MatRadioModule,
    MatSelectModule,
    MatCheckboxModule,
    MatIconModule,
    MatToolbarModule,
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
