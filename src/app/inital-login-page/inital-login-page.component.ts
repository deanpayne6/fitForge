import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-inital-login-page',
  templateUrl: './inital-login-page.component.html',
  styleUrls: ['./inital-login-page.component.css']
})
export class InitalLoginPageComponent {

  userLoginForm: FormGroup;

  constructor(private fb: FormBuilder){ };

  ngonInit(): void{
    this.userLoginForm = this.fb.group({
      userEmail: [''],
      userPassword: ['']
    });
  }

  login(){
    // do api stuff here
  }

  forgotPassword(){
    // forgot password stuff here
  }
}
