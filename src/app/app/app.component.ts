import { Component } from '@angular/core';
import { BackendService } from '../services/backend.services';
import { Router } from '@angular/router';
import { SwUpdate } from '@angular/service-worker';

// interface ClientIdResponse {
//   client_id: string
// }



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'myLingual';
  client_id: string;

  constructor(private swUpdate: SwUpdate) { }


  ngOnInit() {
    this.swUpdate.checkForUpdate()
  }

}
