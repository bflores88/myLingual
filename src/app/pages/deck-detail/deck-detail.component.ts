import { Component, OnInit } from '@angular/core';
import { BackendService } from '../../services/backend.services';
import { Router, ActivatedRoute } from '@angular/router';
import { SessionService } from '../../services/session.service';

@Component({
  selector: 'app-deck',
  templateUrl: './deck-detail.component.html',
  styleUrls: ['./deck-detail.component.scss'],
})
export class DeckDetailComponent implements OnInit {
  user: {
    loggedIn: boolean;
    username: string;
    id: any;
    // target_languages: any;
  };
  userDetail: {
    target_languages: any;
  };
  constructor(
    public backend: BackendService,
    public activated: ActivatedRoute,
    public router: Router,
    public session: SessionService,
  ) {
    this.user = this.session.getSession();
  }

  cards: any = '';
  deck: any = '';

  target_translation: string = '';
  target_language: string = '';

  findTranslatedWord: string = '';
  languages: any = [];


  cardsInDeck = [];
  cardsNotInDeck = [];
  cardsToAdd = [];
  routeId: any;
  addCards: boolean;

  flipCard() {
    // console.log(event.target);
  }

  createTest() {
    this.routeId = this.activated.snapshot.paramMap.get('id');

    this.backend.createTestQuiz(this.routeId).then((data: any) => {
      // console.log(data);
      this.router.navigate([`/test/${data}`]);
    });
  }

  ngOnInit() {
    this.routeId = this.activated.snapshot.paramMap.get('id');

    this.session.getSession();

    let searchId = parseInt(this.user.id);

    this.backend.getUserLanguages().then((data) => {
      this.languages = data;
      this.languages.map((language) => {
        if (language.language_type == 'target' && language.primary == true) {
          this.target_language = language.languages.english_name;
        }
      });

      this.backend.getSpecificDeck(this.routeId).then((data: any) => {
        this.deck = data[0];
        this.cards = this.deck.decks_cards.reverse();
        this.deck.decks_cards.forEach((card) => {
          this.cardsInDeck.push(card.users_cards.card_id);
        })

        this.backend.getUserCards(searchId).then((data: any) => {
          data.forEach((card) => {
            if (this.cardsInDeck.indexOf(card.card_id) === -1) {
              this.cardsNotInDeck.push(card);
            }
          })
        })

      });
    });
  }

  handleAddCard() {
    if (!this.addCards) {
      this.addCards = true;
    } else {
      this.addCards = false;
    }
  }

  addToDeck(e) {
    if (e.target.checked) {
      this.cardsToAdd.push(parseInt(e.target.value));

    } else {
      const findInCardsToAdd = this.cardsToAdd.indexOf(parseInt(e.target.value));
      this.cardsToAdd.splice(findInCardsToAdd, 1);
    }

  }

  handleSubmit() {
    const data = {
      new_decks_cards: this.cardsToAdd,
      deck_id: this.routeId
    }

    return this.backend.postDeckCard(data).then((result) => {
      this.ngOnInit();
      this.addCards = false;
      this.cardsToAdd = [];
    })
  }

  handleCancel() {
    this.cardsToAdd = [];
    this.addCards = false;
  }
}
