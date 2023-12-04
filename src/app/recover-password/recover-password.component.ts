import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { User } from '../models/user';
import { UrlService } from '../url.service';


@Component({
  selector: 'app-recover-password',
  templateUrl: './recover-password.component.html',
  styleUrls: ['./recover-password.component.css']
})
export class RecoverPasswordComponent {

  
  constructor(private fb: FormBuilder, 
    private router: Router, 
    public userService: UserService,
    public urlService: UrlService) { };

  userLoginForm: FormGroup;

  ngOnInit(): void {
    this.userLoginForm = this.fb.group({
      userEmail: ['', [Validators.required, Validators.email]],
    });
  }

  sendEmail() {
    const email = {
      email: this.userLoginForm.get('userEmail').value
    }
  }

  

}
