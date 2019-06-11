import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user: {
    id: number;
    name: string;
    username: string;
    primaryLanguage: string;
    learningLanguages: string;
    imageLink: string;
  };

  constructor() { }

  ngOnInit() {
  }

}
