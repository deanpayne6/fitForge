import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  

  isLoggedIn(){
    if (localStorage.getItem("login_token") !== null && localStorage.getItem("login_token") !== undefined){
      return true;
    }
    else {
      return false;
    }
  }

  getToken(){
    return localStorage.getItem("login_token")
  }
}
