import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  user = {
    loggedIn: false,
    username: '',
    id: '',
  };

  constructor() {
    const userString = window.localStorage.getItem('user');
    try {
      if (userString) {
        this.user = JSON.parse(userString);
      } else {
        console.log('user was not found');
      }
    } catch (err) {
      console.log('could not parse user');
    }
  }

  getSession() {
    return this.user;
  }

  setSession(userData) {
    this.user.username = userData.username;
    this.user.loggedIn = true;
    this.user.id = userData.id;

    //save to local storage
    const userString = JSON.stringify(this.user);
    window.localStorage.setItem('user', userString);
  }

  clearSession() {
    this.user.username = '';
    this.user.id = '';
    this.user.loggedIn = false;
    window.localStorage.removeItem('user');
  }

  //helper function
  isLoggedIn() {
    return this.user.loggedIn;
  }
}
