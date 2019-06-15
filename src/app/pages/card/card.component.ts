import { Component, OnInit } from '@angular/core';
import { BackendService } from 'src/app/services/backend.services';
import { ActivatedRoute } from '@angular/router';

interface ResponseData {
  errorMessage: string;
}

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})

export class CardComponent implements OnInit {
  flashcard: Object;
  errorMessage: String;

  hasFlashcard = false;

  constructor(private backend: BackendService, private route: ActivatedRoute) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.backend.getFlashcard(id)
    .then((response: ResponseData) => {
      if (response.errorMessage) {
        this.hasFlashcard = false;
        this.errorMessage = response.errorMessage;
      } else {
        this.hasFlashcard = true;
        this.flashcard = response;
      }
    })
    .catch(() => {
      this.hasFlashcard = false;
      this.errorMessage = 'Error retrieving card.';
    })
  }
}
