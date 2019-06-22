import { Component, OnInit } from '@angular/core';
import { BackendService } from '../../services/backend.services';
import { Router, ActivatedRoute } from '@angular/router';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss'],
})
export class TestComponent implements OnInit {
  constructor(
    public backend: BackendService,
    public activated: ActivatedRoute,
    public router: Router,
    public session: SessionService,
  ) {}

  // user info
  user: any = '';

  userDetail: any = '';

  target_language: any = '';

  quiz_contents: any = '';

  //
  cards: any = '';

  words: any = '';

  translations: any = '';

  totalCards: number = 0;

  // current quiz state

  currentQuizScore: number = 0;

  currentCard: number = 0;

  currentAnswer: string = '';

  currentInput: string = '';

  currentQuizId: number = 0;

  currentQuizContent: any = 0;

  wrongMessage: string = '';
  correctMessage: string = '';

  quizPercentage: any = '';

  languages: any = [];

  capitalLanguage: string = '';

  flipCard() {
    console.log(event.target);
  }

  submitAnswer() {
    console.log(this.currentInput);
    this.wrongMessage = '';
    this.correctMessage = '';

    let answerBody = {
      attempts: parseInt(this.currentQuizContent.attempts + 1),
      successes: parseInt(this.currentQuizContent.successes),
    };
    if (this.currentInput == this.currentAnswer) {
      this.currentQuizScore += 1;
      answerBody.successes += 1;
      this.correctMessage = 'Correct!';
    } else {
      this.wrongMessage = `Correct Answer: ${this.currentAnswer} `;
    }

    // console.log('body', answerBody);
    this.backend.answerQuestion(this.currentQuizId, answerBody).then((data: any) => {
      this.currentCard += 1;
      if (!(this.totalCards < this.currentCard + 1)) {
        if (this.target_language == 'spanish') {
          this.currentAnswer = this.translations[this.currentCard].spanish_word;
        }
        if (this.target_language == 'italian') {
          this.currentAnswer = this.translations[this.currentCard].italian_word;
        }

        if (this.target_language == 'japanese') {
          this.currentAnswer = this.translations[this.currentCard].japanese_word;
        }

        this.currentQuizId = this.quiz_contents[this.currentCard].id;
        this.currentQuizContent = this.quiz_contents[this.currentCard];
      }
      console.log('current score', this.currentQuizScore);
      console.log('total cards', this.totalCards);
      this.quizPercentage = eval(`${this.currentQuizScore}/${this.totalCards}`).toFixed(2);
      this.quizPercentage *= 100;
      console.log(this.quizPercentage);
      this.currentInput = '';
    });
  }

  retakeTest() {
    let routeId = this.activated.snapshot.paramMap.get('id');
    // this.router.navigateByUrl(`/test/${routeId}`);
    this.router.navigateByUrl(`/decks`);
  }

  toGrades() {
    // let routeId = this.activated.snapshot.paramMap.get('id');
    // this.router.navigateByUrl(`/test/${routeId}`);
    this.router.navigateByUrl(`/grades`);
  }

  ngOnInit() {
    this.user = this.session.getSession();

    let searchId = parseInt(this.user.id);

    // this.backend.getUserProfile(searchId).then((data: any) => {
    //   this.userDetail = data;
    //   console.log('yooooo');
    //   this.target_language = this.userDetail.target_languages[0];
    //   console.log('language', this.target_language);
    // });
    this.backend.getUserLanguages().then((data) => {
      console.log(data);
      this.languages = data;
      this.languages.map((language) => {
        if (language.language_type == 'target' && language.primary == true) {
          this.target_language = language.languages.english_name;
          console.log('target lang', this.target_language);
        }
      });
    });
    // console.log('param', this.activated.snapshot.paramMap.get('post_id'));
    let routeId = this.activated.snapshot.paramMap.get('id');
    this.backend.getSpecificQuiz(routeId).then((data: any) => {
      // console.log('data', data);
      // this.deck = data[0];
      this.quiz_contents = data[0].quiz_contents;
      let cardsArray = [];
      let wordsArray = [];
      let translationArray = [];
      this.cards = this.quiz_contents.map((question, idx) => {
        cardsArray.push(question.users_cards.cards);
        wordsArray.push(question.users_cards.cards.words);
        if (this.target_language == 'spanish') {
          // console.log('questoin', question.users_cards.cards.words);
          translationArray.push(question.users_cards.cards.words.spanish_translations);
        }
        if (this.target_language == 'italian') {
          translationArray.push(question.users_cards.cards.words.italian_translations);
        }

        if (this.target_language == 'japanese') {
          // console.log('question', question.users_cards.cards.words);
          translationArray.push(question.users_cards.cards.words.japanese_translations);
        }
      });
      this.totalCards = this.quiz_contents.length;
      this.cards = cardsArray;
      this.words = wordsArray;
      this.translations = translationArray;

      // console.log('translations', this.translations);
      // console.log('quiz contents', this.quiz_contents);
      // console.log('cards', this.cards);
      // console.log('words', this.words);
      // console.log('transaltions', this.translations);

      // setting starting quiz state
      if (this.target_language == 'spanish') {
        this.currentAnswer = this.translations[this.currentCard].spanish_word;
      }
      if (this.target_language == 'italian') {
        this.currentAnswer = this.translations[this.currentCard].italian_word;
      }
      if (this.target_language == 'japanese') {
        this.currentAnswer = this.translations[this.currentCard].japanese_word;
      }

      this.currentQuizId = this.quiz_contents[this.currentCard].id;
      this.currentQuizContent = this.quiz_contents[this.currentCard];

      this.capitalLanguage = this.target_language.charAt(0).toUpperCase() + this.target_language.slice(1);
      // console.log(this.currentAnswer);
      // console.log(this.currentQuizContent);
    });
  }
}
