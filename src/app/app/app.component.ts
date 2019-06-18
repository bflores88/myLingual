import { Component } from '@angular/core';
import { BackendService } from '../services/backend.services';
import { Router } from '@angular/router';

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

  constructor(private backend: BackendService, private router: Router) { }


  // ngOnInit() {
  //   return this.backend.getClientId().then((data: ClientIdResponse) => {
  //     this.client_id = data.client_id;
  //     console.log(data);
  //   })
  // }

}
