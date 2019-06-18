import { Component, OnInit } from '@angular/core';
import { BackendService } from 'src/app/services/backend.services';
import { Router, ActivatedRoute } from '@angular/router';
import { SessionService } from 'src/app/services/session.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.scss'],
})
export class UserSettingsComponent implements OnInit {
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

  constructor(
    private backend: BackendService,
    private router: Router,
    private activated: ActivatedRoute,
    private session: SessionService,
    private auth: AuthService,
  ) {}

  languages: any = [];

  target_language_id: any = 0;

  ngOnInit() {
    this.backend.getAllLanguages().then((data) => {
      this.languages = data;
    });
  }

  changeTarget() {
    let targetId = parseInt(this.target_language_id);
    this.backend.changeTargetLanguage(targetId).then((data) => {
      this.message = 'Target language changed successfully!';
    });
  }
}
