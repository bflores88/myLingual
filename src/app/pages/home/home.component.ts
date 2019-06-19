import { Component, OnInit } from '@angular/core';
import { BackendService } from 'src/app/services/backend.services';
import { SocketService } from 'src/app/services/socket.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  conversations: any[];
  constructor(private backend: BackendService, private socketService: SocketService) {}

  ngOnInit() {
    this.backend.getConversations().then((data: any) => {
      this.conversations = data;
      console.log(this.conversations);
      this.conversations.forEach((conversation) => {
        return this.socketService.joinRoom(conversation.id);
      });
    });

    // auth2 is initialized with gapi.auth2.init() and a user is signed in.
    // let auth2: any;
    // if (auth2.isSignedIn.get()) {
    //   var profile = auth2.currentUser.get().getBasicProfile();
    //   console.log('ID: ' + profile.getId());
    //   console.log('Full Name: ' + profile.getName());
    //   console.log('Image URL: ' + profile.getImageUrl());
    //   console.log('Email: ' + profile.getEmail());
    // }
  }
}
