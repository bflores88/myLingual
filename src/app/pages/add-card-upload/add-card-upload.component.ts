import { Component, OnInit } from '@angular/core';
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
  selector: 'app-add-card-upload',
  templateUrl: './add-card-upload.component.html',
  styleUrls: ['./add-card-upload.component.scss'],
})
export class AddCardUploadComponent implements OnInit {
  uploadForm: FormGroup;
  public imagePath;
  imgURL: any;
  public message: string;

  decks: any;

  results = [];
  english_word = '';
  add_to_deck = '';
  new_deck_name = '';

  selectImage = true;
  confirm = false;
  loading = false;
  showPhoto = true;
  showWordConfirm = false;
  newDeck = false;
  showSuccess = false;
  buttonDisabled = true;

  userId = 0;
  errorMessage = '';

  constructor(private backend: BackendService, private session: SessionService, private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.uploadForm = this.formBuilder.group({
      image: [''],
    });
    this.backend.getUserDecks().then((data: DeckResponse) => {
      this.decks = data;
    });
    return this.getUserSession();
  }

  getUserSession() {
    let user = this.session.getSession();
    this.userId = parseInt(user.id);
  }

  cancelSubmit() {
    this.confirm = false;
    this.selectImage = true;
    this.showPhoto = false;
  }

  submitImage() {
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

  preview(files) {
    if (files.length === 0) return;

    const mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = 'Only images are supported.';
      return;
    }

    const file = files[0];
    this.uploadForm.get('image').setValue(file);
    this.selectImage = false;
    this.confirm = true;
    this.showPhoto = true;

    const reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.imgURL = reader.result;
    };
  }

  handleInputOnChange() {
    if (this.add_to_deck === 'new-deck') {
      this.newDeck = true;
      
      this.buttonDisabled = false;
    }

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
    if (this.english_word.length === 0 && this.buttonDisabled) {
      return true;
    }
    return this.english_word.length === 0 || this.buttonDisabled;
  }
}
