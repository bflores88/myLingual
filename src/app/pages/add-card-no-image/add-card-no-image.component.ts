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
  selector: 'app-add-card-no-image',
  templateUrl: './add-card-no-image.component.html',
  styleUrls: ['./add-card-no-image.component.scss'],
})
export class AddCardNoImageComponent implements OnInit {
  userId = 0;
  errorMessage = '';

  formData: {
    english_word: string;
  } = {
    english_word: '',
  };

  constructor(private backend: BackendService, private session: SessionService) {}

  ngOnInit() {}

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
}
