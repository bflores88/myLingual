import { Component, OnInit } from '@angular/core';
import { BackendService } from 'src/app/services/backend.services';
import { Router, ActivatedRoute } from '@angular/router';
import { SessionService } from 'src/app/services/session.service';
import { FormBuilder, FormGroup } from '@angular/forms';

interface AddWordResponse {
  message: string,
  english_word: string,
  id: number,
  image_link: string,
  results: []
}

interface DeckResponse {
  decks: [],
}

@Component({
  selector: 'app-add-card-upload',
  templateUrl: './add-card-upload.component.html',
  styleUrls: ['./add-card-upload.component.scss']
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



  userId = 0;
  errorMessage = '';

  constructor(private backend: BackendService, private session: SessionService, private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.uploadForm = this.formBuilder.group({
      image: ['']
    });
    this.backend.getUserDecks().then((data: DeckResponse) => {
      this.decks = data;
    })
    return this.getUserSession()
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
      console.log(data);
      this.errorMessage = data.message;
    })
  }

  preview(files) {

    if (files.length === 0)
      return;
 
    const mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = "Only images are supported.";
      return;
    }

    const file = files[0];
    console.log(file)
    this.uploadForm.get('image').setValue(file);
    this.selectImage = false;
    this.confirm = true;
    this.showPhoto = true;

    const reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]); 
    reader.onload = (_event) => { 
      this.imgURL = reader.result; 
    }
  }

  handleInputOnChange() {
    // const value = e.currentTarget.value;
    // const name = e.currentTarget.name;
    console.log(this.add_to_deck)
    if (this.add_to_deck === "new-deck") {
      this.newDeck = true;
    }
  }

  handleWordSelect(e) {
    console.log(e.target.value);
    this.english_word = e.target.value;
  }

  handleSubmitWord() {
    const data = {
      english_word: this.english_word
    }

    return this.backend.postFlashcard(data).then((data: AddWordResponse) => {
      console.log(data)
    })
  }

}
