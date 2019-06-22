import { Component, OnInit } from '@angular/core';
import { BackendService } from 'src/app/services/backend.services';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { SessionService } from 'src/app/services/session.service';
import { DictionaryService } from 'src/app/services/dictionary.service';
import { FormControl } from '@angular/forms';

interface ResponseData {
  errorMessage: string;
  updatedDownloads: number;
  updatedLikes: number;
  canDownload: boolean;
  canLike: boolean;
  mainDefinitions: string[];
  subsenseDefinitions: string[];
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

interface Definitions {
  mainDefinitions: string[];
  subsenseDefinitions: string[];
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
  hasUser = false;
  hasFlashcard = false;
  hasCreator = false;
  hasDefinitions = false;
  hasSecondaryDefinitions = false;
  hasRelation = false;
  hasAllData = false;

  canLike: boolean;
  canDownload: boolean;
  canShare: boolean;

  routeID: string;
  cardTableId: string[] = [];
  cardTableIdPosition: number;

  flashcard: Flashcard;
  creator: User;
  definitions: Definitions;
  
  user = {
    session: {
      loggedIn: undefined,
      username: undefined,
      id: undefined,
    },
    decks: undefined,
  };

  deckID = new FormControl('');

  constructor(
    public backend: BackendService, 
    public activatedRoute: ActivatedRoute,
    public router: Router, 
    public session: SessionService,
    public dictionary: DictionaryService,
  ) {}

  ngOnInit() {
    this.user.session = this.session.getSession();
    this.user.session.loggedIn ? this.hasUser = true : this.hasUser = false;
    this.backend.getUserDecks().then((decks) => { this.user.decks = decks });
    
    this.backend.getFlashcards()
    .then((cards: Flashcard[]) => {
      cards.forEach((card: Flashcard) => {
        this.cardTableId.push(card.id.toString());
      });
      this.cardTableIdPosition = this.cardTableId.indexOf(this.activatedRoute.snapshot.paramMap.get('id'));

      this.activatedRoute.paramMap.subscribe((routeParams: ParamMap) => {
        this.getCard()
        .then(()=> this.getCreator()
        .then(()=> this.getRelationStatus()
        .then(()=> this.validateDownload()
        .then(()=> this.validateLike()
        ))));
      });
    });
  }

  getCard() {
    this.routeID = this.activatedRoute.snapshot.paramMap.get('id');

    return this.backend.getFlashcard(this.routeID)
    .then((response: ResponseData) => {

      if (response.errorMessage) {
        this.hasFlashcard = false;
        this.errorMessage = response.errorMessage;

      } else {
        this.flashcard = (response as unknown) as Flashcard;
        this.hasFlashcard = true;
      }

      document.querySelector("#myCard").classList.toggle("flip")
    })
    .catch(() => {
      this.errorMessage = 'Error retrieving card.';
    });
  }

  getCreator() {
    return this.backend.getUserProfile(this.flashcard.created_by)
    .then((result: User) => {

      this.creator = result;
      this.hasCreator = true;
    })
    .catch(() => {
      this.errorMessage = 'Error retrieving creator details.';
    });
  }

  getRelationStatus(){
    return this.backend.getUserContacts()
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

  validateDownload() {
    return this.backend.downloadFlashcardVerify(this.routeID, this.user.session.id)
    .then((response: ResponseData) => {
      this.canDownload = response.canDownload;
    })
    .catch((error) => {
      this.errorMessage = error.errorMessage;
      this.canDownload = false;
    })
  }

  validateLike() {
    return this.backend.likeFlashcardVerify(this.routeID, this.user.session.id)
    .then((response: ResponseData) => {
      this.canLike = response.canLike;
    })
    .catch((error) => {
      this.errorMessage = error.errorMessage;
      this.canLike = false;
    })
  }

  getDefinitions() {
    this.dictionary.getWordDefinitions(this.flashcard.english_word)
    .then((response: ResponseData) => {
      if (response.errorMessage) {
        this.errorMessage = response.errorMessage;
        this.definitions = null;
        this.hasDefinitions = false;
        this.hasSecondaryDefinitions = false;
      } else {
        this.definitions = (response as unknown) as Definitions;
        this.hasDefinitions = true;

        if (this.definitions.subsenseDefinitions.length > 0) {
          this.hasSecondaryDefinitions = true;
        } else {
          this.hasSecondaryDefinitions = false;
        }
      }
    })
    .catch((error) => {
      this.errorMessage = error.errorMessage;
    })
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

  like() {
    if (this.canLike) {
      this.backend.likeFlashcard(this.routeID, this.user.session.id)
      .then((response: ResponseData) => {
        if (response.errorMessage){
          this.errorMessage = response.errorMessage;
        } else {
          this.flashcard.likes = response.updatedLikes;
          this.canLike = false;
        }
      })
      .catch((error) => {
        this.errorMessage = error.errorMessage;
      });
    }
  }

  download() {
    if (this.deckID.status === "VALID") {
      this.backend.downloadFlashcard(this.flashcard.id.toString(), this.user.session.id) 
      .then((response: ResponseData) => {
        if (response.errorMessage) {
          this.errorMessage = response.errorMessage;
          this.canDownload = true;
        } else {
          this.flashcard.downloads = response.updatedDownloads;
          this.canDownload = false;
        }

        this.backend.postDeckCard({
          usercard_id: this.flashcard.id,
          deck_id: this.deckID.value,
        })
        .then((response: ResponseData) => {
          if (response.errorMessage) {this.errorMessage = response.errorMessage};
        })
        .catch((error) => {
          this.errorMessage = error.errorMessage;
        });
      });
    }
  }
}