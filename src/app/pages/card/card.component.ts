import { Component, OnInit } from '@angular/core';
import { BackendService } from 'src/app/services/backend.services';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { SessionService } from 'src/app/services/session.service';
import { DictionaryService } from 'src/app/services/dictionary.service';

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

  flashcard: Flashcard;
  cardTableId: string[] = [];
  cardTableIdPosition: number;

  creator: User;
  definitions: Definitions;
  
  user: {
    loggedIn: boolean;
    username: string;
    id: any;
  };

  constructor(
    public backend: BackendService, 
    public activatedRoute: ActivatedRoute,
    public router: Router, 
    public session: SessionService,
    public dictionary: DictionaryService,
  ) {}

  ngOnInit() {
    this.user = this.session.getSession();
    if (this.user.loggedIn){
      this.hasUser = true;
    } else {
      this.hasUser = false;
    }

    this.backend.getFlashcards()
    .then((cards: Flashcard[]) => {

      cards.forEach((card: Flashcard) => {
        this.cardTableId.push(card.id.toString());
      });

      this.cardTableIdPosition = this.cardTableId.indexOf(this.activatedRoute.snapshot.paramMap.get('id'));

      this.activatedRoute.paramMap.subscribe((routeParams: ParamMap) => {
        // Behavior on navigation to page from other pages or same pages
        this.loadCard()
        .then(()=> this.getCreator()
        .then(()=> this.getRelationStatus()
        .then(()=> this.validateDownload()
        .then(()=> this.validateLike()
        .then(()=> this.getDefinitions() 
        )))));
      });
    })
  }

  loadCard() {
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
    return this.backend.downloadFlashcardVerify(this.routeID, this.user.id)
    .then((response: ResponseData) => {
      this.canDownload = response.canDownload;
    })
    .catch((error) => {
      this.errorMessage = error.errorMessage;
      this.canDownload = false;
    })
  }

  validateLike() {
    return this.backend.likeFlashcardVerify(this.routeID, this.user.id)
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

  addLike() {
    if (this.canLike) {
      this.backend.likeFlashcard(this.routeID, this.user.id)
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
    if (this.canDownload) { 
      this.backend.downloadFlashcard(this.routeID, this.user.id)
      .then((response: ResponseData) => {
        if (response.errorMessage){
          this.errorMessage = response.errorMessage;
        } else {
          this.flashcard.downloads = response.updatedDownloads;
          this.canDownload = false;
        }
      })
      .catch((error) => {
        this.errorMessage = error.errorMessage;
      });
    }
  }
}