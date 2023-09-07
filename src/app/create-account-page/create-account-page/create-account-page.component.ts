import { Component, OnInit} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from './api.service';

@Component({
  selector: 'app-create-account-page',
  templateUrl: './create-account-page.component.html',
  styleUrls: ['./create-account-page.component.css']
})

export class CreateAccountPageComponent {

  userRegisterForm: FormGroup;
  showPasswordRequirements = false;
  isUsernameAvailable: boolean = false;
  isEmailAvailable = {};

  constructor(private fb: FormBuilder, private apiService: ApiService) {}

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

  isPasswordValid(){
    const password = this.userRegisterForm.get('userPassword').value;

    const isLengthValid = password.length >= 8;
    const hasSpecialCharacter = this.specialCharacterPattern.test(password);
    const hasNumber = this.numberPattern.test(password);

    return isLengthValid && hasSpecialCharacter && hasNumber;
  }

  isConfirmPasswordValid() {
    const password = this.userRegisterForm.get('userPassword').value;
    const confirmPassword = this.userRegisterForm.get('userPasswordConfirm').value;
    
    if (password === ""){
      return false;
    }
    return password === confirmPassword;
  }

  // this call is being done without authentication atm, erick implement
  onEmailBlur() {
    const email = this.userRegisterForm.get('userEmail').value;
  
    if (email) {
      this.apiService.checkEmailAvailability(email).subscribe(
        (response) => {
          console.log("Email exists: ", response.exists);
          this.isEmailAvailable = response.exists; // Update email availability status
        },
        (error) => {
          // Handle error, e.g., show an error message
          console.error("Error:", error);
        }
      );
    }
  }

  onUsernameBlur() {
    const username = this.userRegisterForm.get('username').value;
  
    if (username) {
      this.apiService.checkUsernameAvailability(username).subscribe(
        (response) => {
          console.log("Username exists: ", response.exists);
          this.isUsernameAvailable = response.exists; // Update username availability status
        },
        (error) => {
          // Handle error, e.g., show an error message
          console.error("Error:", error);
        }
      );
    }
  }


  register(){
    
  }

  specialCharacterPattern = /[!@#$%^&*(),.?":{}|<>]/;
  numberPattern = /[0-9]/;
}
