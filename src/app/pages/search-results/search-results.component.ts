import { Component, OnInit } from '@angular/core';
import { BackendService } from '../../services/backend.services';
import { ActivatedRoute, Router } from '@angular/router';

interface SearchMatches {
  match_id: number;
  match_name: string;
  match_score: number;
  match_image: string;
  match_own: number;
  match_other_text: string;
  match_other_string: string;
  match_type: string;
  sortScore: number;
}

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss'],
})
export class SearchResultsComponent implements OnInit {
  searchMatches: SearchMatches[];
  filterToggle: number = 0;
  search_text: string;
  error_text: string;
  show_error: boolean = false;

  constructor(public backend: BackendService, public route: ActivatedRoute, public router: Router) {
    this.search_text = this.route.snapshot.paramMap.get('search_text');
  }

  ngOnInit() {
    this.route.params.subscribe(routeParams => {
      this.search_text = routeParams.search_text;
      this.backend.search(this.search_text).then((data: SearchMatches[]) => {
        if (data.length === 0) {
          this.error_text = `Sorry, no results for '${this.search_text}'`;
          this.show_error = true;
        } else {
          this.show_error = false;
        }

        this.searchMatches = data;
      });
    })

  }




  // takes users to detail page when selecting a match from dropdown
  showDetail(matchId, matchType) {
    if (matchType === 'user') {
      this.router.navigate([`/profile/${matchId}`]);
    } else if (matchType === 'card') {
      this.router.navigate([`/card/${matchId}`]);
    }
  }

  searchAll() {
    this.backend.search(this.search_text).then((data: SearchMatches[]) => {
      if (data.length === 0) {
        this.error_text = `Sorry, no results for '${this.search_text}'`;
        this.show_error = true;
      } else {
        this.show_error = false;
      }

      this.searchMatches = data;
      this.filterToggle = 0;

    });
  }

  searchCards() {
    this.backend.searchCards(this.search_text).then((data: SearchMatches[]) => {
      if (data.length === 0) {
        this.error_text = `Sorry, no cards for '${this.search_text}'`;
        this.show_error = true;
      } else {
        this.show_error = false;
      }

      this.searchMatches = data;
      this.filterToggle = 1;
    });
  }

  searchUsers() {
    this.backend.searchUsers(this.search_text).then((data: SearchMatches[]) => {
      if (data.length === 0) {
        this.error_text = `Sorry, no users for '${this.search_text}'`;
        this.show_error = true;
      } else {
        this.show_error = false;
      }

      this.searchMatches = data;
      this.filterToggle = 2;
    });
  }
}
