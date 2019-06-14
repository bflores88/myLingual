import { Component, OnInit } from '@angular/core';
import { BackendService } from '../../services/backend.services';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-deck',
  templateUrl: './deck-detail.component.html',
  styleUrls: ['./deck-detail.component.scss'],
})
export class DeckDetailComponent implements OnInit {
  constructor(private backend: BackendService, private activated: ActivatedRoute, private router: Router) {}

  cards: any = '';

  deck: any = '';

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
    this.backend.getSpecificDeck(routeId).then((data: any) => {
      // console.log(data);
      this.deck = data[0];
      this.cards = this.deck.decks_cards;
      console.log('data', this.deck);
      console.log(this.cards);
    });
  }
}
