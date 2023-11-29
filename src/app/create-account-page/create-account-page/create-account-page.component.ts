import { Component, OnInit} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from './api.service';
import { Router } from '@angular/router';
import { User } from '../../models/user';
import { first } from 'rxjs';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-create-account-page',
  templateUrl: './create-account-page.component.html',
  styleUrls: ['./create-account-page.component.css']
})

export class CreateAccountPageComponent {

  // variables
  userRegisterForm: FormGroup;
  showPasswordRequirements = false;
  isUsernameAvailable: boolean = false;
  isEmailAvailable: boolean = false;

  // patterns
  specialCharacterPattern = /[!@#$%^&*(),.?":{}|<>]/;
  numberPattern = /[0-9]/;
  captialLetterPattern = /[A-Z]/

  constructor(private fb: FormBuilder, private apiService: ApiService, private router: Router, public userService: UserService) {}

  ngOnInit(): void {
    this.userRegisterForm = this.fb.group({
      userEmail: ['', [Validators.required, Validators.email]],
      userFirstName: ['', [Validators.required]],
      userLastName: ['', [Validators.required]],
      userAge: ['',[Validators.required, Validators.min(18)]],
      username: ['',[Validators.required]],
      userPassword: ['',[Validators.required]],
      userPasswordConfirm: ['',[Validators.required]],
      termsAndConditions: ['', [Validators.requiredTrue]],
      termsCheckboxStatus: [false],
    })
  }
  
  handleCheckboxChange() {
    this.userRegisterForm.patchValue({
      termsCheckboxStatus: !this.userRegisterForm.get('termsCheckboxStatus').value
    });
  }

  // this checks if the password is valid, uppercase, lowercase, number and special character
  isPasswordValid(){
    const password = this.userRegisterForm.get('userPassword').value;

    const isLengthValid = password.length >= 8;
    const hasSpecialCharacter = this.specialCharacterPattern.test(password);
    const hasNumber = this.numberPattern.test(password);
    const hasCapital = this.captialLetterPattern.test(password);

    return isLengthValid && hasSpecialCharacter && hasNumber && hasCapital;
  }

  // this function is to ensure that the user types their password correctly (confirm password textbox)
  isConfirmPasswordValid() {
    const password = this.userRegisterForm.get('userPassword').value;
    const confirmPassword = this.userRegisterForm.get('userPasswordConfirm').value;
    
    if (password === ""){
      return false;
    }
    return password === confirmPassword;
  }

  // this function send a get request to check if the email exist in the db
  // this call is being done without proper authentication, eric plese take care of that
  onEmailBlur() {
    const email = this.userRegisterForm.get('userEmail').value;
  
    if (email) {
      this.apiService.checkEmailAvailability(email).subscribe(
        (response) => {
          console.log("Email exists: ", response.exists);
          if (response.exists === true){
            this.isEmailAvailable = false;
          }else{
            this.isEmailAvailable = true;
          }
        },
        (error) => {
          console.error("Checking email availability error:", error);
        }
      );
    }
  }

  // this function sends a get request to check if the email exist in the db
  // this call is also being done without authentication, please fix
  onUsernameBlur() {
    const username = this.userRegisterForm.get('username').value;
  
    if (username) {
      this.apiService.checkUsernameAvailability(username).subscribe(
        (response) => {
          console.log("Username exists: ", response.exists);
          if (response.exists === true){
            this.isUsernameAvailable = false;
          }else{
            this.isUsernameAvailable = true;
          }
        },
        (error) => {
          console.error("Checking username availability error:", error);
        }
      );
    }
  }


  // this is a post request for to populate the db with new user
  // still unsure if it works, waiting on backend to implement function on backend to properly add to db
  register() {

    const first_name =  this.userRegisterForm.value.userFirstName;
    const last_name = this.userRegisterForm.value.userLastName;
    const email = this.userRegisterForm.value.userEmail;
    const password =  this.userRegisterForm.value.userPassword;
    const age = this.userRegisterForm.value.userAge; //this does not exist on db yet
    const username_value = this.userRegisterForm.value.username;
    const newUser = new User (email, username_value, first_name, last_name, age)
    newUser.password = password;
    console.log(newUser);
    // this is the part that is doing the post request, still not sure if it works, waiting for backend
    this.apiService.sendPostRequest(newUser).subscribe(
      (response) => {
        console.log(response)
        if (response.status === "201") {
          console.log("Registration successful.");
          console.log("Response data:", response.body);
          this.userService.setUser(newUser);
          this.router.navigate(['/userquestionnaire']);
        } else if (response.status === "400") {
          console.error("Registration failed with status code:", response.status);
          alert("Invalid username and / or email!")
        }
      },
      (error) => {
        console.error("Registration error:", error);
      }
    );
  }
}
