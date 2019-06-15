import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  formData: {
    username: string;
    password: string;
  } = {
    username: '',
    password: '',
  };

  constructor(private auth: AuthService, private router: Router) {}

  login() {
    this.auth
      .login(this.formData)
      .then((response) => {
        const { redirectUrl } = this.auth;
        if (redirectUrl) {
          this.router.navigate([redirectUrl]);
          this.auth.redirectUrl = '';
        } else {
          //redirects to the home page
          this.router.navigate(['/home']);
        }
      })
      .catch((err) => {
        console.log('error', err);
      });
  }

  onSignIn(googleUser) {
    const profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.

    // after signin, retrieve the user's ID token
    const id_token = googleUser.getAuthResponse().id_token;

    // send the ID token to your server using backend service

    // redirect to home
    this.router.navigate(['/home']);
  }

  ngOnInit() {}
}
