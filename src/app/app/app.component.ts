import { Component } from '@angular/core';
import { BackendService } from '../services/backend.services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'myLingual';
  client_id: string;

  constructor(public router: Router, public backend: BackendService) {}

  ngOnInit() {}
}
