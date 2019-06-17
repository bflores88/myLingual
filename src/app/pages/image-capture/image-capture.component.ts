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
      this.video.nativeElement.srcObject = stream;
    });
  }

  public capture() {
    let context = this.canvas.nativeElement.getContext('2d').drawImage(this.video.nativeElement, 0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);
    this.captures.push(this.canvas.nativeElement.toDataURL('images/jpeg', 1));

    this.video.nativeElement.srcObject.getTracks().forEach(track => track.stop())
  }
}
