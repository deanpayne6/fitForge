import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from './api.service';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-inital-login-page',
  templateUrl: './inital-login-page.component.html',
  styleUrls: ['./inital-login-page.component.css']
})
export class InitalLoginPageComponent {

  userLoginForm: FormGroup;

  constructor(private fb: FormBuilder, private apiService: ApiService, private router: Router, public userService: UserService) { };

  
  userExists = false;

  ngOnInit(): void {
    this.userLoginForm = this.fb.group({
      userEmail: ['', [Validators.required, Validators.email]],
      userPassword: ['', [Validators.required]],
    });
  }


  login() {

    const userData = {
      email: this.userLoginForm.get('userEmail').value,
      password: this.userLoginForm.get('userPassword').value
    }

    // set user email
    this.userService.setUser(this.userLoginForm.get('userEmail').value);

    let url = "http://localhost:3200/login?email=" + userData.email + "&password=" + userData.password;

    if (userData) {
      this.apiService.checkLoginInfo(url, userData).subscribe(
        (response) => {
          console.log(response)
          console.log("User exists: ", response.authenticated);
          if (response.authenticated === true){
            this.router.navigate(['/home'])
          } else {
            // user should see something like 'email does not exist'
          }
        },
        (error) => {
          console.error("Checking email availability error:", error);
        }
      );
    }
    console.log(userData);
  }

  forgotPassword() {
    // forgot password stuff here

  }
}