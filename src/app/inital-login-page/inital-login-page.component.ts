import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from './api.service';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { User } from '../models/user';

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

    let url = "http://localhost:3200/auth/login";

    if (userData) {
      this.apiService.checkLoginInfo(url, userData).subscribe(
        (response) => {
          if (response.token){
            localStorage.setItem("login_token", response.token);
            this.userService.setUser(response.user_data)
            console.log(this.userService.getUser())
            this.router.navigate(['/home'])
          } else {
            alert("Invalid email or password!")
          }
        },
        (error) => {
          console.error("Checking email availability error:", error);
          alert("Invalid data.")
        }
      );
    }
  }

  forgotPassword() {
    // forgot password stuff here

  }
}