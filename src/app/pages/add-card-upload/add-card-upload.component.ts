import { Component, OnInit } from '@angular/core';
import { BackendService } from 'src/app/services/backend.services';
import { Router, ActivatedRoute } from '@angular/router';
import { SessionService } from 'src/app/services/session.service';

interface AddWordResponse {
  message: string,
  english_word: string,
  id: number
}

@Component({
  selector: 'app-add-card-upload',
  templateUrl: './add-card-upload.component.html',
  styleUrls: ['./add-card-upload.component.scss']
})
export class AddCardUploadComponent implements OnInit {
  public imagePath;
  imgURL: any;
  public message: string;

  userId = 0;
  errorMessage = '';

  formData: {
    english_word: string;
  } = {
    english_word: '',
  };

  constructor(private backend: BackendService, private session: SessionService) {}

  ngOnInit() {
    return this.getUserSession();
  }

  getUserSession() {
    let user = this.session.getSession();
    this.userId = parseInt(user.id);
  }

  submitWord() {
    const word = this.formData;
    this.backend.postFlashcard(word).then((data: AddWordResponse) => {
      console.log(data);
      this.errorMessage = data.message;
    })
  }

  preview(files) {
    if (files.length === 0)
      return;
 
    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = "Only images are supported.";
      return;
    }
 
    var reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]); 
    reader.onload = (_event) => { 
      this.imgURL = reader.result; 
    }
  }

}
