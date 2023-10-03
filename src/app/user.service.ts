import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  
  // our current user
  current_user: String;

  // setters and getters
  setUser(user: String){
    this.current_user = user;
  }

  getUser(){
    return this.current_user;
  }

  // clear user
  clearUser(){
    this.current_user = "";
  }

}
