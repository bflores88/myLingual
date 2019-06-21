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

  languages_list: any = [];

  target_language_id: any = 0;

  new_target_language_id: number = 0;

  clicked_add_new: boolean = false;

  clicked_change_target: boolean = false;

  current_primary: any = '';

  ngOnInit() {
    this.backend.getUserLanguages().then((data) => {
      this.languages = data;
      console.log('ur lang', this.languages);

      // find primary
      let nonPrimaryLang = [];

      this.languages.forEach((element) => {
        if (element.primary == true) {
          this.current_primary = element;
        } else {
          nonPrimaryLang.push(element);
        }
      });

      console.log('primary', this.current_primary);
      this.languages = nonPrimaryLang;
      // this.languages.shift();
      // console.log(this.languages);
      this.backend.getAllLanguages().then((data) => {
        let yourLanguageList = [];
        let nonTargetList = [];
        this.languages.forEach((element) => {
          yourLanguageList.push(element.language_id);
        });
        // console.log('yourlanmg', yourLanguageList);
        this.languages_list = data;
        // console.log('not filtered', this.languages_list);
        this.languages_list = this.languages_list.forEach((lang) => {
          if (!yourLanguageList.includes(lang.id) && lang.id !== 3) {
            // console.log('its in there');
            nonTargetList.push(lang);
          }
        });
        console.log('filtered', nonTargetList);
        this.languages_list = nonTargetList;
      });
    });
  }

  showAddNew() {
    this.clicked_add_new = true;
    console.log(this.clicked_add_new);
  }

  changeAddTarget(id) {
    this.new_target_language_id = id;
    console.log(this.new_target_language_id);
  }

  changeNewPrimary(id) {
    this.target_language_id = id;
    console.log(this.target_language_id);
  }

  showChangeTarget() {
    this.clicked_change_target = true;
    console.log(this.clicked_change_target);
  }

  addTarget() {
    let targetId = this.new_target_language_id;
    let body = {
      language_id: targetId,
    };
    this.backend.addUserLanguage(body).then((data) => {
      this.message = 'Target language added successfully!';
    });

    //
    this.backend.getUserLanguages().then((data) => {
      this.languages = data;
      this.languages.shift();
      console.log(this.languages);
      this.backend.getAllLanguages().then((data) => {
        let yourLanguageList = [];
        let nonTargetList = [];
        this.languages.forEach((element) => {
          yourLanguageList.push(element.language_id);
        });
        // console.log(yourLanguageList);
        this.languages_list = data;
        // console.log('not filtered', this.languages_list);
        this.languages_list = this.languages_list.forEach((lang) => {
          if (!yourLanguageList.includes(lang.id) && lang.id !== 3) {
            // console.log('its in there');
            nonTargetList.push(lang);
          }
        });
        // console.log('filtered', nonTargetList);
        this.languages_list = nonTargetList;
      });
    });
  }

  changeTarget() {
    let targetId = parseInt(this.target_language_id);
    console.log(targetId);
    this.backend.changeTargetLanguage(targetId).then((data) => {
      this.message = 'Target language changed successfully!';
    });
  }
}
