import { Component, OnInit } from '@angular/core';
import { BackendService } from 'src/app/services/backend.services';
import { Router, ActivatedRoute } from '@angular/router';
import { SessionService } from 'src/app/services/session.service';

interface AddWordResponse {
  message: string;
  english_word: string;
  id: number;
}

interface DeckResponse {
  decks: [];
}

@Component({
  selector: 'app-add-card-no-image',
  templateUrl: './add-card-no-image.component.html',
  styleUrls: ['./add-card-no-image.component.scss'],
})
export class AddCardNoImageComponent implements OnInit {
  userId = 0;
  errorMessage = '';

  decks: any;
  add_to_deck = '';
  new_deck_name = '';
  showWordConfirm = false;
  newDeck = false;
  showSuccess = false;
  buttonDisabled = true;


  formData: {
    english_word: string;
  } = {
    english_word: '',
  };

  constructor(private backend: BackendService, private session: SessionService) {}

  ngOnInit() {
    this.backend.getUserDecks().then((data: DeckResponse) => {
      this.decks = data;
    });
    return this.getUserSession();
  }

  getUserSession() {
    let user = this.session.getSession();
    this.userId = parseInt(user.id);
  }

  submitWord() {
    if (this.formData.english_word.length === 0) {
      return (this.errorMessage = 'No word provided.');
    } else {
      const word = this.formData;
      this.backend.postFlashcard(word).then((data: AddWordResponse) => {
        console.log(data);
        this.errorMessage = data.message;
      });
    }
  }

  handleSubmitWord() {
    const data = {
      english_word: this.formData.english_word,
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
    return this.formData.english_word.length === 0 || this.buttonDisabled;
  }
}
