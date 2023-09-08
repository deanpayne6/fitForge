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
  isEmailAvailable: boolean = false;

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
    const hasCapital = this.captialLetterPattern.test(password);

    return isLengthValid && hasSpecialCharacter && hasNumber && hasCapital;
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
          if (response.exists === true){
            this.isEmailAvailable = false; // Update email availability status
          }else{
            this.isEmailAvailable = true;
          }
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
          if (response.exists === true){
            this.isUsernameAvailable = false;
          }else{
            this.isUsernameAvailable = true;
          }
        },
        (error) => {
          // Handle error, e.g., show an error message
          console.error("Error:", error);
        }
      );
    }
  }


  register() {
    if (this.userRegisterForm.valid) {
      // Form is valid, proceed with registration
      const formData = {
        userEmail: this.userRegisterForm.value.userEmail,
        userFirstName: this.userRegisterForm.value.userFirstName,
        userLastName: this.userRegisterForm.value.userLastName,
        userAge: this.userRegisterForm.value.userAge,
        username: this.userRegisterForm.value.username,
        userPassword: this.userRegisterForm.value.userPassword,
      };

      this.apiService.sendPostRequest(formData).subscribe(
        (response) => {
          console.log("Registration response:", response);
        },
        (error) => {
          console.error("Registration error:", error);
        }
      );
    }
  }

  specialCharacterPattern = /[!@#$%^&*(),.?":{}|<>]/;
  numberPattern = /[0-9]/;
  captialLetterPattern = /[A-Z]/
}
