import { NgModule } from '@angular/core';
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
import { CreateAccountPageComponent } from './create-account-page/create-account-page/create-account-page.component';
import { HttpClientModule } from '@angular/common/http';
import { AboutPageComponent } from './about-page/about-page.component';
import { QuestionnairePageComponent } from './questionnaire-page/questionnaire-page.component';
import {MatExpansionModule} from '@angular/material/expansion';
import {CdkAccordionModule} from '@angular/cdk/accordion';
import {MatListModule} from '@angular/material/list';
import { FormsModule } from '@angular/forms';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import {MatCheckboxModule} from '@angular/material/checkbox';






@NgModule({
  declarations: [
    AppComponent,
    InitalLoginPageComponent,
    FitforgeLogoComponent,
    ToolbarComponent,
    CreateAccountPageComponent,
    AboutPageComponent,
    QuestionnairePageComponent
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
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
