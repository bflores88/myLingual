import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-card',
  templateUrl: './add-card.component.html',
  styleUrls: ['./add-card.component.scss'],
})
export class AddCardComponent implements OnInit {
  constructor(public router: Router) {}

  // platform: string = '';
  getMobileOperatingSystem() {
    var userAgent = navigator.userAgent || navigator.vendor;
 
    // Windows Phone must come first because its UA also contains "Android"
    if (/windows phone/i.test(userAgent)) {
      return 'Windows Phone';
    }
 
    if (/android/i.test(userAgent)) {
      return 'Android';
    }
 
    // iOS detection from: http://stackoverflow.com/a/9039885/177710
    if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
      return 'iOS';
    }
 
    return 'unknown';
  }

  
  ngOnInit() {
    console.log(this.getMobileOperatingSystem());
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
