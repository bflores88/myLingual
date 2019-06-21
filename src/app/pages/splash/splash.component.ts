import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SessionService } from 'src/app/services/session.service';
import { environment } from '../../../environments/environment';


@Component({
  selector: 'app-splash',
  templateUrl: './splash.component.html',
  styleUrls: ['./splash.component.scss'],
})
export class SplashComponent implements OnInit {
  constructor(private router: Router, private session: SessionService) { }
  TEST = environment.url;

  ngOnInit() {
    console.log(this.TEST);
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
