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
    public backend: BackendService,
    public router: Router,
    public activated: ActivatedRoute,
    public session: SessionService,
    public auth: AuthService,
  ) {}

  languages: any = [];

  languages_list: any = [];

  target_language_id: any = 0;

  new_target_language_id: number = 0;

  clicked_add_new: boolean = false;

  clicked_change_target: boolean = false;

  current_primary: any = '';

  userLanguages: any = [];

  chosen_language_name: string = '';

  all_languages: any = [];

  ngOnInit() {
    this.backend.getUserLanguages().then((data) => {
      this.languages = data;

      this.userLanguages = data;

      let nonPrimaryLang = [];

      this.languages.forEach((element) => {
        if (element.primary == true) {
          this.current_primary = element;
        } else {
          nonPrimaryLang.push(element);
        }
      });

      this.languages = nonPrimaryLang;

      this.backend.getAllLanguages().then((data) => {
        let yourLanguageList = [];
        let nonTargetList = [];

        this.userLanguages.forEach((element) => {
          yourLanguageList.push(element.language_id);
        });

        this.languages_list = data;
        // console.log('not filtered', this.languages_list);
        this.languages_list = this.languages_list.forEach((lang) => {
          if (!yourLanguageList.includes(lang.id) && lang.id !== 3) {
            // console.log('its in there');
            nonTargetList.push(lang);
          }
        });

        this.languages_list = nonTargetList;
      });
    });
  }

  showAddNew() {
    this.clicked_add_new = true;
  }

  changeAddTarget(id) {
    this.new_target_language_id = id;
  }

  changeNewPrimary(language) {
    this.target_language_id = language.id;
    // console.log(language);
    this.backend.getAllLanguages().then((data) => {
      this.all_languages = data;
      this.all_languages.forEach((element) => {
        // console.log(element);
        if (element.id == language.languages.id) {
          // console.log(element);
          this.chosen_language_name = element.english_name.charAt(0).toUpperCase() + element.english_name.slice(1);
        }
      });
    });
  }

  showChangeTarget() {
    this.clicked_change_target = true;
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

        this.router.navigateByUrl(`/profile`);
      });
    });
  }

  changeTarget() {
    let targetId = parseInt(this.target_language_id);

    this.backend.changeTargetLanguage(targetId).then((data) => {
      this.message = 'Target language changed successfully!';
      this.router.navigateByUrl(`/profile`);
    });
  }
}
