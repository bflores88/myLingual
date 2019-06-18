import { Component, OnInit } from '@angular/core';
import { BackendService } from 'src/app/services/backend.services';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { SessionService } from 'src/app/services/session.service';
import { DictionaryService } from 'src/app/services/dictionary.service';

interface ResponseData {
  id: number;
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
  cardTableId: string[] = [];
  cardTableIdPosition: number;

  errorMessage: string;

  id: string;
  flashcard: object;
  definitions: object;
  creator: Creator;
  hasFlashcard = false;
  hasCreator = false;
  hasDefinitions = false;
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
    private session: SessionService,
    private dictionary: DictionaryService,
  ) {}

  ngOnInit() {
    // Only happens on initial navigation to component or entering url manually
    this.backend.getFlashcards().then((cards: ResponseData[]) => {
      cards.forEach((card: ResponseData) => {
        this.cardTableId.push(card.id.toString());
      });
      this.cardTableIdPosition = this.cardTableId.indexOf(this.activatedRoute.snapshot.paramMap.get('id'));

      this.activatedRoute.paramMap.subscribe((routeParams: ParamMap) => {
        this.loadCard();
      });
    })
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
      this.dictionary.getWordDefinitions(response.english_word)
      .then((result) => {
        this.definitions = result;
        this.hasDefinitions = true;
        console.log(this.definitions);
      })
      .catch((error) => {
        this.errorMessage = error.errorMessage;
      });
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
          .catch((error) => {
            if (error.ok === false) {
              this.errorMessage = '';
            } else {
              this.errorMessage = 'Error getting contacts.';
            }
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
    if ((this.cardTableIdPosition + 1) < this.cardTableId.length){
      this.cardTableIdPosition++;
    } else {
      this.cardTableIdPosition = 0;
    }
    
    this.router.navigate([`/card/${this.cardTableId[this.cardTableIdPosition]}`]);
  }

  previousCard() {
    if ((this.cardTableIdPosition - 1) >= 0){
      this.cardTableIdPosition--;
    } else {
      this.cardTableIdPosition = this.cardTableId.length - 1;
    }

    this.router.navigate([`/card/${this.cardTableId[this.cardTableIdPosition]}`]);
  }
}
