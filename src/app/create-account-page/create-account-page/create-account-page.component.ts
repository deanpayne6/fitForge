import { Component, OnInit} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from './api.service';

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
    if (this.userRegisterForm.valid) {
      const formData = {
        first_name: this.userRegisterForm.value.userFirstName,
        last_name: this.userRegisterForm.value.userLastName,
        email: this.userRegisterForm.value.userEmail,
        Password: this.userRegisterForm.value.userPassword,
        // userAge: this.userRegisterForm.value.userAge, //this does not exist on db yet
        // username: this.userRegisterForm.value.username, //does not exist on db yet
      };
      

      // this is the part that is doing the post request, still not sure if it works, waiting for backend
      this.apiService.sendPostRequest(formData).subscribe(
        (response) => {
          if (response.status === 200) {
            console.log("Registration successful.");
            console.log("Response data:", response.body);
          } else {
            console.error("Registration failed with status code:", response.status);
          }
        },
        (error) => {
          console.error("Registration error:", error);
        }
      );
    }
  }
}
