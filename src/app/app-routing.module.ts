// Luis 08/28/23 - Created register page and worked on it

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InitalLoginPageComponent } from './inital-login-page/inital-login-page.component';
import { CreateAccountPageComponent } from './create-account-page/create-account-page/create-account-page.component';
import { AboutPageComponent } from './about-page/about-page.component';

const routes: Routes = [
  {path: '', component: InitalLoginPageComponent},
  {path: 'register', component: CreateAccountPageComponent},
  {path: 'about', component: AboutPageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
