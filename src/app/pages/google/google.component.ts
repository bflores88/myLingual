import { Component, OnInit } from '@angular/core';
import { BackendService } from 'src/app/services/backend.services';
import { Router, ActivatedRoute } from '@angular/router';
import { SessionService } from 'src/app/services/session.service';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-google',
  templateUrl: './google.component.html',
  styleUrls: ['./google.component.scss'],
})
export class GoogleComponent implements OnInit {
  constructor(
    private backend: BackendService,
    private router: Router,
    private activated: ActivatedRoute,
    private session: SessionService,
    private auth: AuthService,
  ) {}

  ngOnInit() {
    console.log('hits googleLogin ngOnInit');
    this.backend.googleLogin().then((data) => {
      console.log('user data', data);
      this.session.setSession(data);
      this.router.navigate(['profile']);
    });
  }
}
