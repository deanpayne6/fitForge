import { Injectable } from '@angular/core';
import { User } from '../app/models/user'
 
@Injectable({
  providedIn: 'root'
})

export class UserService {
  
  // our current user
  current_user: User;

  // setters and getters
  setUser(user: User){
    this.current_user = user;
  }

  getUser(){
    return this.current_user;
  }

  // clear user
  clearUser(){
    this.current_user = null;
  }

}
