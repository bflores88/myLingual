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
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
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

  constructor(
    public backend: BackendService,
    public router: Router,
    public activated: ActivatedRoute,
    public session: SessionService,
    public auth: AuthService,
  ) {}

  ngOnInit() {
    this.getUserSession();

    if (this.activated.snapshot.paramMap.get('user_id')) {
      let searchId = parseInt(this.activated.snapshot.paramMap.get('user_id'));

      return this.backend
        .getUserProfile(searchId)
        .then((data: UserResponse) => {
          this.user = data;
          this.checkUser = this.userID === this.user.id;
        })
        .then(() => {
          return this.backend.getUserContacts().then((data: any) => {
            const contactArray = [];

            data.forEach((contact) => {
              if (contact.invitee != this.userID) {
                contactArray.push(contact.invitees.id);
              } else {
                this.isNotContact = false;
              }
            });

            if (contactArray.indexOf(searchId) === -1) {
              this.isNotContact = true;
            } else if (searchId === this.userID) {
              this.isNotContact = false;
            } else {
              this.isNotContact = false;
            }
          });
        });
    } else {
      return this.backend.getUserProfile(this.userID).then((data: UserResponse) => {
        this.user = data;
        this.targetCheck = this.user.target_languages;
        // console.log('target check', this.targetCheck);
        this.checkUser = this.userID === this.user.id;
        this.isNotContact = false;
      });
    }
  }

  getUserSession() {
    let user = this.session.getSession();
    this.userID = parseInt(user.id);
  }

  sendInvite() {
    this.backend.sendContactInvite(this.activated.snapshot.paramMap.get('user_id')).then((data) => {
      this.message = 'Invite sent';
    });
  }

  toUserSettings() {
    return this.router.navigate(['settings']);
  }

  logout() {
    return this.auth.logout().then(() => {
      this.router.navigate(['/']);
    });
  }
}
