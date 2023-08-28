// Luis 08/28/23 - Created register page and worked on it

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InitalLoginPageComponent } from './inital-login-page/inital-login-page.component';
import { CreateAccountPageComponent } from './create-account-page/create-account-page/create-account-page.component';

const routes: Routes = [
  {path: 'login', component: InitalLoginPageComponent},
  {path: 'register', component: CreateAccountPageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
