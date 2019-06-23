import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-card',
  templateUrl: './add-card.component.html',
  styleUrls: ['./add-card.component.scss'],
})
export class AddCardComponent implements OnInit {
  constructor(public router: Router) {}

  getMobileOperatingSystem() {
    var userAgent = navigator.userAgent || navigator.vendor;

    if (/windows phone/i.test(userAgent)) {
      return 'Windows Phone';
    }

    if (/android/i.test(userAgent)) {
      return 'Android';
    }

    if (/iPad|iPhone|iPod/.test(userAgent)) {
      return 'iOS';
    }

    return 'unknown';
  }

  ngOnInit() {}

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
