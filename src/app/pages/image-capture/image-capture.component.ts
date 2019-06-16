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
    navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
      let videoTracks = stream.getVideoTracks();

      // window.stream = stream;
      video.srcObject = stream;
    });
  }

  public capture() {
    let context = this.canvas.nativeElement.getContext('2d').drawImage(this.video.nativeElement, 0, 0, 640, 480);
    this.captures.push(this.canvas.nativeElement.toDataURL('images/png'));
  }
}
