import { Component, OnInit } from '@angular/core';
import { BackendService } from '../../services/backend.services';
import { Router } from '@angular/router';

interface SearchMatches {
  match_id: number;
  match_name: string;
  match_score: number;
  match_image: string;
  match_own: number;
  match_type: string;
  sortScore: number;
}

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
})
export class SearchBarComponent implements OnInit {
  // initialize searchText as empty string
  searchText: {
    searchText: string;
  } = {
      searchText: '',
    };

  // initialize searchMatches
  searchMatches: SearchMatches[];

  constructor(private backend: BackendService, private router: Router) { }

  ngOnInit() { }

  // search while user types
  searchInit() {
    const { searchText } = this.searchText;

    if (!searchText || searchText.length < 2) {
      this.searchMatches = [];
    } else {
      this.backend.search(searchText).then((data: SearchMatches[]) => {
        // only display first 3 search results in dropdown
        this.searchMatches = data.slice(0, 3);
      });
    }
  }

  // search when user clicks search icon
  searchFull() {
    const { searchText } = this.searchText;
    if (searchText.length > 0) {
      this.router.navigate([`/search/${searchText}`]);
    }
  }

  // takes users to detail page when selecting a match from dropdown
  showDetail(matchId, matchType) {
    if (matchType === 'user') {
      this.router.navigate([`/profile/${matchId}`]);
    } else if (matchType === 'card') {
      this.router.navigate([`/card/${matchId}`]);
    }
  }

  clearDropdown() {
    this.searchMatches = [];
  }
}
