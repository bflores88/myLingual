import { Component, OnInit } from '@angular/core';
import { BackendService } from 'src/app/services/backend.services';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private backend: BackendService) { }

  ngOnInit() {
  }

  testFunction() {
    this.backend.translate()
    .then((result) => {
      console.log(result);
    });
  }
}
