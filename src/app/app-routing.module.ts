import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InitalLoginPageComponent } from './inital-login-page/inital-login-page.component';

const routes: Routes = [
  {path: '', component: InitalLoginPageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
