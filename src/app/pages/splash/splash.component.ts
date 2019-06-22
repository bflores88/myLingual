import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SessionService } from 'src/app/services/session.service';


@Component({
  selector: 'app-splash',
  templateUrl: './splash.component.html',
  styleUrls: ['./splash.component.scss'],
})
export class SplashComponent implements OnInit {
  constructor(public router: Router, public session: SessionService) { };

  ngOnInit() {
    if (this.session.isLoggedIn()) {
      setTimeout(() => {
        this.router.navigate(['home']);
      }, 1000);
    } else {
      setTimeout(() => {
        this.router.navigate(['login']);
      }, 1000);
    }
  }
}
