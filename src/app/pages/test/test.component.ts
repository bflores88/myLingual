import { Component, OnInit } from '@angular/core';
import { BackendService } from '../../services/backend.services';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss'],
})
export class TestComponent implements OnInit {
  constructor(private backend: BackendService, private activated: ActivatedRoute) {}

  quiz_contents: any = '';

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

    console.log('body', answerBody);
    this.backend.answerQuestion(this.currentQuizId, answerBody).then((data: any) => {
      this.currentCard += 1;
      if (!(this.totalCards == this.currentCard + 1) && !(this.totalCards < this.currentCard)) {
        this.currentAnswer = this.translations[this.currentCard].spanish_word;
        this.currentQuizId = this.quiz_contents[this.currentCard].id;
        this.currentQuizContent = this.quiz_contents[this.currentCard];
      }
      this.quizPercentage = eval(`${this.currentQuizScore}/${this.totalCards}`).toFixed(2);
      console.log(this.quizPercentage);
    });
  }

  ngOnInit() {
    // console.log('param', this.activated.snapshot.paramMap.get('post_id'));
    let routeId = this.activated.snapshot.paramMap.get('id');
    this.backend.getSpecificQuiz(routeId).then((data: any) => {
      console.log('data', data);
      // this.deck = data[0];
      this.quiz_contents = data[0].quiz_contents;
      let cardsArray = [];
      let wordsArray = [];
      let translationArray = [];
      this.cards = this.quiz_contents.map((question, idx) => {
        cardsArray.push(question.users_cards.cards);
        wordsArray.push(question.users_cards.cards.words);
        translationArray.push(question.users_cards.cards.words.spanish_translations);
      });
      this.totalCards = this.quiz_contents.length;
      this.cards = cardsArray;
      this.words = wordsArray;
      this.translations = translationArray;
      console.log('quiz contents', this.quiz_contents);
      console.log('cards', this.cards);
      console.log('words', this.words);
      console.log('transaltions', this.translations);

      // setting starting quiz state
      this.currentAnswer = this.translations[this.currentCard].spanish_word;
      this.currentQuizId = this.quiz_contents[this.currentCard].id;
      this.currentQuizContent = this.quiz_contents[this.currentCard];
      console.log(this.currentAnswer);
      console.log(this.currentQuizContent);
    });
  }
}
