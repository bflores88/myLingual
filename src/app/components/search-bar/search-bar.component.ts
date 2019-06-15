import { Component, OnInit } from '@angular/core';
import { BackendService } from '../../services/backend.services';

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

  // initialize searchMatches as empty array
  searchMatches: {
    searchMatches: string;
  }[] = [];

  constructor(private backend: BackendService) {}

  ngOnInit() {}

  searchInit() {
    const { searchText } = this.searchText;

    if (searchText === '') {
      this.searchMatches = [];
    } else {
      this.backend.search(searchText).then((data: { searchMatches: string }[]) => {
        this.searchMatches = data;
      });
    }
  }
}
