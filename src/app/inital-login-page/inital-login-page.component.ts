import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from './api.service';

@Component({
  selector: 'app-inital-login-page',
  templateUrl: './inital-login-page.component.html',
  styleUrls: ['./inital-login-page.component.css']
})
export class InitalLoginPageComponent {

  userLoginForm: FormGroup;

  constructor(private fb: FormBuilder, private apiService: ApiService) { };

  
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
    if (userData) {
      this.apiService.checkLoginInfo(userData).subscribe(
        (response) => {
          console.log("User exists: ", response.exists);
          if (response.exists === true){
            this.userExists = true;
          }else{
            this.userExists = false;
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