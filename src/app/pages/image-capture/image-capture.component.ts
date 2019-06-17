import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-image-capture',
  templateUrl: './image-capture.component.html',
  styleUrls: ['./image-capture.component.scss'],
})
export class ImageCaptureComponent implements OnInit {
  @ViewChild('video')
  public video: ElementRef;

  @ViewChild('canvas')
  public canvas: ElementRef;

  public captures: Array<any>;

  public constructor() {
    this.captures = [];
  }

  public ngOnInit() {}

  public ngAfterViewInit() {

    const constraints = {
      audio: false,
      video: {
          width: {
              min: 320,
              max: 1280
          },
          height: {
              min: 240,
              max: 720
        },
        facingMode: {
          ideal: "environment"
      }
      }
  }
  
    navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
      this.video.nativeElement.srcObject = stream;
    });
  }

  public capture() {

    this.canvas.nativeElement.width = 480;
    this.canvas.nativeElement.height = 600;
    let context = this.canvas.nativeElement
      .getContext('2d')
      .drawImage(this.video.nativeElement, 0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);
    this.captures.push(this.canvas.nativeElement.toDataURL('images/jpeg', 1.0));
  }
}
