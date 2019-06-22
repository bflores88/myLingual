import { Component, OnInit } from '@angular/core';
import { BackendService } from 'src/app/services/backend.services';
import { Router, ActivatedRoute } from '@angular/router';
import { SessionService } from 'src/app/services/session.service';
import { AuthService } from 'src/app/services/auth.service';
import { container } from '@angular/core/src/render3';

interface UserResponse {
  id: number;
  active: boolean;
  role_id: number;
  role: string;
  name: string;
  username: string;
  email: string;
  profile_image_url: string;
  created_at: string;
  cards_owned: number;
  cards_created: number;
  decks: number;
  native_languages: object;
  target_languages: object;
}

@Component({
  selector: 'app-grade',
  templateUrl: './grade.component.html',
  styleUrls: ['./grade.component.scss'],
})
export class GradeComponent implements OnInit {
  userID = 0;

  user: {
    id: number;
    active: boolean;
    role_id: number;
    role: string;
    name: string;
    username: string;
    email: string;
    profile_image_url: string;
    created_at: string;
    cards_owned: number;
    cards_created: number;
    decks: number;
    native_languages: object;
    target_languages: object;
  };

  message: string = '';
  checkUser: boolean;
  isNotContact: boolean;
  targetCheck: any = '';
  decks: any = [];
  quizResults: any = [];

  constructor(
    public backend: BackendService,
    public router: Router,
    public activated: ActivatedRoute,
    public session: SessionService,
    public auth: AuthService,
  ) {}

  ngOnInit() {
    this.backend.getUserQuizzes().then((data: UserResponse) => {
      this.decks = data;
      console.log(this.decks);

      this.decks.forEach((deck) => {
        let newDeck = [];
        deck.quizzes.forEach((quiz) => {
          let quizTotal = parseInt(quiz.quiz_contents.length);
          let quizPoints = 0;
          quiz.quiz_contents.forEach((question) => {
            if (question.successes !== 0) {
              quizPoints++;
            }
          });

          let score = quizPoints / quizTotal;
          quiz.points = quizPoints;
          quiz.total = quizTotal;

          quiz.score = score;
        });

        console.log(this.decks);
      });
    });
  }
}
