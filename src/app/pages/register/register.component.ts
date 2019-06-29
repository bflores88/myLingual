import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { BackendService } from 'src/app/services/backend.services';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  formData: {
    username: string;
    password: string;
  } = {
    username: '',
    password: '',
  };

  constructor(public auth: AuthService, public router: Router, public backend: BackendService) {}

  toLogin() {
    this.router.navigateByUrl('/login');
  }

  register() {
    console.log('hits register button');
    this.auth
      .register(this.formData)
      .then((response) => {
        console.log('returns from backend');
        const { redirectUrl } = this.auth;
        if (redirectUrl) {
          console.log('hits if statement');
          this.router.navigate([redirectUrl]);
          this.auth.redirectUrl = '';
        } else {
          //redirects to the home page
          console.log('hits else statement');
          this.router.navigate(['/home']);
        }
      })
      .catch((err) => {
        console.log('error', err);
      });
  }

  ngOnInit() {}
}
