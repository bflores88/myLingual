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
    // console.log('getting user session ', this.session.getSession());
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
        // console.log('flashcard retrieved ', this.flashcard);
      }

      this.backend.getUserProfile(response.created_by)
      .then((result: Creator) => {
        this.creator = result;
        this.hasCreator = true;
        // console.log('flashcard creator ', result);

        if (this.user.loggedIn) {
          // console.log('known user visits page');
          this.backend.getUserContacts()
          .then((result: []) => {
            this.hasRelation = false;
            result.forEach((contact: Contact) => {
              // console.log('contact ', contact);
              if (contact.id === this.creator.id){
                this.hasRelation = true;
              }
            })
            // if (this.hasRelation){
              // console.log('the creator is the users friend');
            // } else {
              // console.log('the user has no relation to the creator');
            // }
          })
          .catch((error) => {
            this.errorMessage = 'Error getting contacts.';
            // console.log('error getting contacts ', error);
          });
        }
        // } else {
        //   console.log('anonymous person visits page');
        // }
      })
      .catch(() => {
        this.errorMessage = 'Error retrieving creator details.';
        // console.log('hasCreator: ', this.hasCreator);
      });
    })
    .catch(() => {
      this.errorMessage = 'Error retrieving card.';
      console.log('hasFlashcard: ', this.hasFlashcard);
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
