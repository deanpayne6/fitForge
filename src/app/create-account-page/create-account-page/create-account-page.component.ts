import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-account-page',
  templateUrl: './create-account-page.component.html',
  styleUrls: ['./create-account-page.component.css']
})

export class CreateAccountPageComponent {

  userRegisterForm: FormGroup;
  showPasswordRequirements = false;

  constructor(private fb: FormBuilder){};

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

  register(){
    
  }

  specialCharacterPattern = /[!@#$%^&*(),.?":{}|<>]/;
  numberPattern = /[0-9]/;
}
