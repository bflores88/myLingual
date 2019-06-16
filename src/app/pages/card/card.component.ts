import { Component, OnInit } from '@angular/core';
import { BackendService } from 'src/app/services/backend.services';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { SessionService } from 'src/app/services/session.service';

interface ResponseData {
  errorMessage: string;
  english_word: string;
  created_by: number;
  spanish_translations: string;
  italian_translations: string;
}

interface Contact {
  id: number;
}

interface Creator {
  id: number;
}

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})

export class CardComponent implements OnInit {
  errorMessage: string;

  id: string;
  flashcard: object;
  creator: Creator;
  hasFlashcard = false;
  hasCreator = false;
  hasRelation: boolean;
  
  user: {
    loggedIn: boolean;
    username: string;
    id: any;
  };

  constructor(
    private backend: BackendService, 
    private activatedRoute: ActivatedRoute,
    private router: Router, 
    private session: SessionService
  ) {}

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((routeParams: ParamMap) => {
      this.loadCard();
    });
  }

  loadCard() {
    this.user = this.session.getSession();
    this.id = this.activatedRoute.snapshot.paramMap.get('id');

    this.backend.getFlashcard(this.id)
    .then((response: ResponseData) => {
      if (response.errorMessage) {
        this.hasFlashcard = false;
        this.errorMessage = response.errorMessage;
      } else {
        const englishWordCaptial = response.english_word.slice(0, 1).toUpperCase();
        const englishWordRemainder = response.english_word.slice(1);
        response.english_word = englishWordCaptial + englishWordRemainder;
        this.flashcard = response;
        this.hasFlashcard = true;
      }

      this.backend.getUserProfile(response.created_by)
      .then((result: Creator) => {
        this.creator = result;
        this.hasCreator = true;

        if (this.user.loggedIn) {
          this.backend.getUserContacts()
          .then((result: []) => {
            this.hasRelation = false;
            result.forEach((contact: Contact) => {
              if (contact.id === this.creator.id){
                this.hasRelation = true;
              }
            })
          })
          .catch(() => {
            this.errorMessage = 'Error getting contacts.';
            
          });
        }
      })
      .catch(() => {
        this.errorMessage = 'Error retrieving creator details.';
      });
    })
    .catch(() => {
      this.errorMessage = 'Error retrieving card.';
    });
  }

  nextCard() {
    // replace later
    let newParam = parseInt(this.id) + 1;
    if (newParam <= 5){
      console.log('nextCard()');
      this.router.navigate([`/card/${newParam}`]);
    }
  }

  previousCard() {
    // replace later
    let newParam = parseInt(this.id) - 1;
    if (newParam > 0){
      console.log('previousCard()');
      this.router.navigate([`/card/${newParam}`]);
    }
  }
}
