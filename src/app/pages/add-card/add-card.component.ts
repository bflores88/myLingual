import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-card',
  templateUrl: './add-card.component.html',
  styleUrls: ['./add-card.component.scss'],
})
export class AddCardComponent implements OnInit {
  constructor(public router: Router) {}

  ngOnInit() {
    // console.log(navigator.onLine)
  }

  continue() {
    return this.router.navigate(['add-card/continue']);
  }

  toImageUpload() {
    return this.router.navigate(['add-card/upload']);
  }

  toCaptureImage() {
    return this.router.navigate(['add-card/capture']);
  }
}
