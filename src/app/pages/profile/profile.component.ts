import { Component, OnInit } from '@angular/core';
import { BackendService } from 'src/app/services/backend.services';
import { Router, ActivatedRoute } from '@angular/router';
import { SessionService } from 'src/app/services/session.service';
import { AuthService } from 'src/app/services/auth.service';

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

  constructor(
    private backend: BackendService,
    private router: Router,
    private activated: ActivatedRoute,
    private session: SessionService,
    private auth: AuthService,
  ) {}

  ngOnInit() {
    this.getUserSession();

    if (this.activated.snapshot.paramMap.get('user_id')) {
      let searchId = parseInt(this.activated.snapshot.paramMap.get('user_id'));

      return this.backend.getUserProfile(searchId).then((data: UserResponse) => {
        this.user = data;
      });
    } else {
      return this.getUser();
    }
  }

  getUserSession() {
    let user = this.session.getSession();
    this.userID = parseInt(user.id);
  }

  getUser() {
    this.backend.getUserProfile(this.userID).then((data: UserResponse) => {
      this.user = data;

      console.log(data);
    });
  }

  sendInvite() {
    this.backend.sendContactInvite(this.activated.snapshot.paramMap.get('user_id')).then((data) => {
      this.message = 'Invite sent';

      console.log(data);
    });
  }

  toUserSettings() {
    return this.router.navigate(['settings']);
  }

  logout() {
    return this.auth.logout()
      .then(() => {
        this.router.navigate(['/login'])
    })
  }
}
