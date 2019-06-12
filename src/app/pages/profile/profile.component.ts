import { Component, OnInit } from '@angular/core';
import { BackendService } from 'src/app/services/backend.services';
import { Router, ActivatedRoute } from '@angular/router';

interface UserResponse {
  id: number;
  active: boolean;
  role_id: number,
  role: string,
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
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  userID = 1;

  user: {
    id: number;
    active: boolean;
    role_id: number,
    role: string,
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


  constructor(
    private backend: BackendService,
    private router: Router,
    private activated: ActivatedRoute,
  ) { }

  ngOnInit() {
    if (this.activated.snapshot.paramMap.get('user_id')) {
      let searchId = parseInt(this.activated.snapshot.paramMap.get('user_id'))

      return this.getUser(searchId);
    } else {
      return this.getUser(1);

    }
    
  }

  getUser(id) {
    this.backend.getUserProfile(id).then((data: UserResponse) => {
      this.user = data;

      console.log(data);
    })
  }

}
