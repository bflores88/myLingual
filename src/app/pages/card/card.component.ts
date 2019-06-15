import { Component, OnInit } from '@angular/core';
import { BackendService } from 'src/app/services/backend.services';
import { ActivatedRoute } from '@angular/router';

interface ResponseData {
  errorMessage: string;
  english_word: string;
  spanish_translations: string;
  italian_translations: string;
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
        const englishWordCaptial = response.english_word.slice(0, 1).toUpperCase();
        const englishWordRemainder = response.english_word.slice(1);
        response.english_word = englishWordCaptial + englishWordRemainder;
        this.hasFlashcard = true;
        this.flashcard = response;
        console.log(this.flashcard);
      }
    })
    .catch(() => {
      this.hasFlashcard = false;
      this.errorMessage = 'Error retrieving card.';
    })
  }
}
