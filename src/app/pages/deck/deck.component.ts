import { Component, OnInit } from '@angular/core';
import { BackendService } from '../../services/backend.services';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-deck',
  templateUrl: './deck.component.html',
  styleUrls: ['./deck.component.scss'],
})
export class DeckComponent implements OnInit {
  constructor(private backend: BackendService, private activated: ActivatedRoute) {}

  decks: {
    name: string;
    updated_at: string;
  }[] = [];

  ngOnInit() {
    // console.log('param', this.activated.snapshot.paramMap.get('post_id'));
    // let routeId = this.activated.snapshot.paramMap.get('post_id');
    this.backend.getUserDecks().then((data: any) => {
      // console.log(data);
      this.decks = data;
      console.log(this.decks);
      //
      function compareValues(key, order = 'asc') {
        return function(a, b) {
          if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
            return 0;
          }

          const varA = typeof a[key] === 'string' ? a[key].toUpperCase() : a[key];
          const varB = typeof b[key] === 'string' ? b[key].toUpperCase() : b[key];

          let comparison = 0;
          if (varA > varB) {
            comparison = 1;
          } else if (varA < varB) {
            comparison = -1;
          }
          return order == 'desc' ? comparison * -1 : comparison;
        };
      }
      let sortedDecks = this.decks.sort(compareValues('updated_at', 'asc'));
      this.decks = sortedDecks;
      console.log(this.decks);
    });
  }
}
