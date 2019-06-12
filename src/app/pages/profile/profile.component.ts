import { Component, OnInit } from '@angular/core';
import { BackendService } from 'src/app/services/backend.services';
import { Router } from '@angular/router';

interface UserResponse {
  name: string;
  username: string;
  email: string;
  profileImageUrl: string;
  id: number;
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
    name: string;
    username: string;
    primaryLanguage: string;
    learningLanguages: string;
    imageLink: string;
  };

  constructor(
    private backend: BackendService,
    private router: Router,
  ) { }

  ngOnInit() {
  }

  getUser() {
    this.backend.getUserProfile(this.userID).then((data: UserResponse) => {

    })
  }

}
