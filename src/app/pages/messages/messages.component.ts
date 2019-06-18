import { Component, OnInit } from '@angular/core';
import { BackendService } from '../../services/backend.services';
import { ActivatedRoute } from '@angular/router';
import { SessionService } from 'src/app/services/session.service';

interface MessageData {
  message_id: number;
  sent_by_user_id: number;
  sent_by_username: string;
  body: string;
  conversation_id: number;
  created_at: Date;
}

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss'],
})
export class MessagesComponent implements OnInit {
  messages: MessageData[] = [];
  messageBody: string = '';

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

  constructor(private backend: BackendService, private route: ActivatedRoute, private session: SessionService) {}

  ngOnInit() {
    let user = this.session.getSession();
    this.userID = parseInt(user.id);

    console.log(this.userID);

    const id = this.route.snapshot.paramMap.get('id');
    this.backend.getMessages(id).then((data: MessageData[]) => {
      this.messages = data;
      console.log(this.messages);
    });
  }

  sendMessage() {
    const id = this.route.snapshot.paramMap.get('id');
    this.backend.sendMessage(id, this.messageBody).then(() => {
      this.backend.getMessages(id).then((data: MessageData[]) => {
        this.messages = data;
        this.messageBody = '';
      });
    });
  }
}
