import { Component, OnInit } from '@angular/core';
import { BackendService } from '../../services/backend.services';
import { ActivatedRoute } from '@angular/router';

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
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss'],
})
export class SearchResultsComponent implements OnInit {
  searchMatches: SearchMatches[];

  constructor(private backend: BackendService, private route: ActivatedRoute) {}

  ngOnInit() {
    const search_text = this.route.snapshot.paramMap.get('search_text');
    this.backend.search(search_text).then((data: SearchMatches[]) => {
      this.searchMatches = data;
    });
  }
}
