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
    this.auth
      .register(this.formData)
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

  ngOnInit() {}
}
