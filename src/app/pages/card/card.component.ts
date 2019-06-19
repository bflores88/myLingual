import { Component, OnInit } from '@angular/core';
import { BackendService } from 'src/app/services/backend.services';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { SessionService } from 'src/app/services/session.service';
import { DictionaryService } from 'src/app/services/dictionary.service';

interface ResponseData {
  errorMessage: string;
}

interface Flashcard {
  id: number;
  english_word: string;
  image_link: string;
  created_by: number;
  spanish_translations: string;
  italian_translations: string;
  likes: number;
  downloads: number;
  shares: number;
}

interface User {
  id: number;
}

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})

export class CardComponent implements OnInit {
  errorMessage: string;
  hasFlashcard = false;
  hasCreator = false;
  hasDefinitions = false;
  hasRelation = false;

  routeID: string;

  flashcard: Flashcard;
  cardTableId: string[] = [];
  cardTableIdPosition: number;

  creator: User;
  definitions: object;
  
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
    this.backend.getFlashcards().then((cards: Flashcard[]) => {
      cards.forEach((card: Flashcard) => {
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
    this.routeID = this.activatedRoute.snapshot.paramMap.get('id');

    this.backend.getFlashcard(this.routeID)
    .then((response: ResponseData) => {
      if (response.errorMessage) {
        this.hasFlashcard = false;
        this.errorMessage = response.errorMessage;
      } else {
        this.flashcard = (response as unknown) as Flashcard;
        this.hasFlashcard = true;
      }
      // this.dictionary.getWordDefinitions(response.english_word)
      // .then((result) => {
      //   this.definitions = result;
      //   this.hasDefinitions = true;
      //   console.log(this.definitions);
      // })
      // .catch((error) => {
      //   this.errorMessage = error.errorMessage;
      // });
      this.backend.getUserProfile(this.flashcard.created_by)
      .then((result: User) => {
        this.creator = result;
        this.hasCreator = true;

        if (this.user.loggedIn) {
          this.backend.getUserContacts()
          .then((result: []) => {
            this.hasRelation = false;
            result.forEach((contact: User) => {
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

  addLike() {
    if (this.user.loggedIn) {
      this.backend.likeFlashcard(this.routeID)
      .then((response: Flashcard) => {
        this.flashcard.likes = response.likes;
      })
      .catch((error) => {
        this.errorMessage = error.errorMessage;
      });
    }
  }

  download() {
    if (this.user.loggedIn) {
      this.backend.downloadFlashcard(this.routeID)
      .then((response: Flashcard) => {
        this.flashcard.downloads = response.downloads;
      })
      .catch((error) => {
        this.errorMessage = error.errorMessage;
      });
    }
  }

  share() {
    if (this.user.loggedIn) {
      this.backend.shareFlashcard(this.routeID)
      .then((response: Flashcard) => {
        this.flashcard.shares = response.shares;
      })
      .catch((error) => {
        this.errorMessage = error.errorMessage;
      })
    }
  }
}