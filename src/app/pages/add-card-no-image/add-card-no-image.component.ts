import { Component, OnInit } from '@angular/core';
import { BackendService } from 'src/app/services/backend.services';
import { SessionService } from 'src/app/services/session.service';
import { DictionaryService } from 'src/app/services/dictionary.service';

interface AddWordResponse {
  message: string;
  english_word: string;
  id: number;
  isWord: boolean;
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
  isWord: boolean;

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

  constructor(public backend: BackendService, public session: SessionService, public dictionary: DictionaryService) {}

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

  handleInputOnChange() {
    if (this.add_to_deck === 'new-deck') {
      this.newDeck = true;

      this.buttonDisabled = false;
    }

    this.buttonDisabled = false;
  }

  handleSubmitWord() {
    const data = {
      english_word: this.formData.english_word,
    };

    return this.dictionary.validateWord(data.english_word).then((result: AddWordResponse) => {
      if (!result.isWord) {
        return (this.errorMessage = 'Not a valid word.');
      } else {
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
    });
  }

  isInvalid() {
    return this.formData.english_word.length === 0 || this.buttonDisabled;
  }
}
