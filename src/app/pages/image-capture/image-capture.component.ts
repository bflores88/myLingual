import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { BackendService } from 'src/app/services/backend.services';
import { Router, ActivatedRoute } from '@angular/router';
import { SessionService } from 'src/app/services/session.service';
import { FormBuilder, FormGroup } from '@angular/forms';

interface AddWordResponse {
  message: string;
  english_word: string;
  id: number;
  image_link: string;
  results: [];
}

interface DeckResponse {
  decks: [];
}

@Component({
  selector: 'app-image-capture',
  templateUrl: './image-capture.component.html',
  styleUrls: ['./image-capture.component.scss'],
})
export class ImageCaptureComponent implements OnInit {
  uploadForm: FormGroup;
  hideVideo = false;
  english_word = '';
  add_to_deck = '';
  new_deck_name = '';
  userId = 0;
  errorMessage = '';
  results = [];
  decks: any;
  selectImage = true;
  confirm = false;
  loading = false;
  showPhoto = true;
  showWordConfirm = false;
  newDeck = false;
  showSuccess = false;
  buttonDisabled = true;

  @ViewChild('video')
  public video: ElementRef;

  @ViewChild('canvas')
  public canvas: ElementRef;

  public captures: Array<any>;

  public constructor(
    private backend: BackendService,
    private session: SessionService,
    private formBuilder: FormBuilder,
  ) {
    this.captures = [];
  }

  public ngOnInit() {
    this.uploadForm = this.formBuilder.group({
      image: [''],
    });
    this.backend.getUserDecks().then((data: DeckResponse) => {
      this.decks = data;
    });
    return this.getUserSession();
  }

  public ngAfterViewInit() {
    const constraints = {
      audio: false,
      video: {
        width: {
          min: 320,
          max: 1280,
        },
        height: {
          min: 240,
          max: 720,
        },
        facingMode: {
          ideal: 'environment',
        },
      },
    };

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
    this.video.nativeElement.srcObject.getTracks().forEach((track) => track.stop());
    this.hideVideo = true;
    this.selectImage = false;
    this.confirm = true;
    this.showPhoto = true;

  }

  ngOnDestroy() {
    this.video.nativeElement.srcObject.getTracks().forEach((track) => track.stop());
  }

  getUserSession() {
    let user = this.session.getSession();
    this.userId = parseInt(user.id);
  }

  cancelSubmit() {
    this.confirm = false;
    this.selectImage = true;
    this.showPhoto = false;
    this.hideVideo = false;
    this.captures = [];
    return this.ngAfterViewInit();
  }

  submitImage() {
    const file = this.captures[0];
    this.uploadForm.get('image').setValue(file);
    this.loading = true;
    this.confirm = false;
    let formData = new FormData();
    formData.append('image', this.uploadForm.value.image);

    this.backend.postFlashcardImageUpload(formData).then((data: AddWordResponse) => {
      this.loading = false;
      this.showWordConfirm = true;
      this.results = data.results;
      this.errorMessage = data.message;
    });
  }

  handleInputOnChange() {
    if (this.add_to_deck === 'new-deck') {
      this.newDeck = true;
      
      this.buttonDisabled = false;
    }
    
    console.log(this.add_to_deck)
    this.buttonDisabled = false;
  }

  handleWordSelect(e) {
    this.english_word = e.target.value;
  }

  handleSubmitWord() {
    const data = {
      english_word: this.english_word,
    };

    this.backend.postFlashcard(data).then((data: AddWordResponse) => {
      const newData = {
        usercard_id: data.id,
        deck_id: this.add_to_deck,
        new_deck_name: this.new_deck_name,
      };

      this.showSuccess = true;
      this.showWordConfirm = false;

      return this.backend.postDeckCard(newData);
    });
  }

  isInvalid() {
    return this.english_word.length === 0 || this.buttonDisabled;
  }

}
