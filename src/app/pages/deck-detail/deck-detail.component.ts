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
    private backend: BackendService,
    private activated: ActivatedRoute,
    private router: Router,
    private session: SessionService,
  ) {
    this.user = this.session.getSession();
  }

  cards: any = '';

  deck: any = '';

  target_translation: string = '';
  target_language: string = '';

  findTranslatedWord: string = '';

  flipCard() {
    console.log(event.target);
  }

  createTest() {
    let routeId = this.activated.snapshot.paramMap.get('id');

    this.backend.createTestQuiz(routeId).then((data: any) => {
      console.log(data);
      this.router.navigate([`/test/${data}`]);
    });
  }

  ngOnInit() {
    // console.log('param', this.activated.snapshot.paramMap.get('post_id'));
    let routeId = this.activated.snapshot.paramMap.get('id');
    // console.log('user', this.user);

    this.session.getSession();

    let searchId = parseInt(this.user.id);

    this.backend.getUserProfile(searchId).then((data: any) => {
      this.userDetail = data;

      this.target_language = this.userDetail.target_languages[0];

      this.backend.getSpecificDeck(routeId, 'how do you like this code eh?').then((data: any) => {
        // console.log(data);
        this.deck = data[0];
        this.cards = this.deck.decks_cards;
        console.log('data', this.deck.decks_cards[0].users_cards.cards.words.italian_translations);
        // console.log(this.cards);
      });
    });

    // let targetLanguage = this.user.target_languages[0];
  }
}
