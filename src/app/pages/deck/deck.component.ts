import { Component, OnInit } from '@angular/core';
import { BackendService } from '../../services/backend.services';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-deck',
  templateUrl: './deck.component.html',
  styleUrls: ['./deck.component.scss'],
})
export class DeckComponent implements OnInit {
  constructor(public backend: BackendService, public activated: ActivatedRoute) {}

  decks: {
    name: string;
    updated_at: string;
  }[] = [];

  ngOnInit() {
    this.backend.getUserDecks().then((data: any) => {
      this.decks = data;
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
    });
  }
}
