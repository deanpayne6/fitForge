import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { User } from '../models/user';
import { UrlService } from '../url.service';
import { RecoverPassApiService } from './recover-pass-api.service';

@Component({
  selector: 'app-recover-password',
  templateUrl: './recover-password.component.html',
  styleUrls: ['./recover-password.component.css']
})
export class RecoverPasswordComponent {

  
  constructor(private fb: FormBuilder, 
    private router: Router, 
    public userService: UserService,
    public urlService: UrlService,
    private recoverApi: RecoverPassApiService
    ) { };

  userLoginForm: FormGroup;

  ngOnInit(): void {
    this.userLoginForm = this.fb.group({
      userEmail: ['', [Validators.required, Validators.email]],
    });
  }

  sendEmail() {
    
    const email = this.userLoginForm.get('userEmail').value

    if (email) {
      this.recoverApi.sendPostRequest(email).subscribe(
        (response) => {
          if (response.token){
        
            this.router.navigate(['/login'])
          }
        },
        (error) => {
          console.error("Checking email availability error:", error);
          alert("Invalid data.")
        }
      );
    }
  }

  

}
