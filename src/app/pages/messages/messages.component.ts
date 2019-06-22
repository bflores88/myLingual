import { Component, OnInit } from '@angular/core';
import { BackendService } from '../../services/backend.services';
import { ActivatedRoute } from '@angular/router';
import { SessionService } from 'src/app/services/session.service';
import { SocketService } from 'src/app/services/socket.service';
import { Injectable } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

interface MessageData {
  message_id: number;
  sent_by_user_id: number;
  sent_by_username: string;
  body: string;
  conversation_id: number;
  created_at: Date;
}

@Injectable()
@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss'],
})
export class MessagesComponent implements OnInit {
  messages: MessageData[] = [];
  msg: Observable<any>;
  private msgSub: Subscription;
  newMessages = [];
  messageBody = '';

  userId = 0;
  roomId = 0;
  conversation_id: number;
  username = '';

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

  constructor(
    public backend: BackendService,
    public route: ActivatedRoute,
    public session: SessionService,
    public socketService: SocketService,
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.roomId = parseInt(id);
    let user = this.session.getSession();
    this.userId = parseInt(user.id);
    this.username = user.username;
    

    this.socketService.sendIdentity(this.userId);

    this.backend
      .getMessages(id)
      .then((data: MessageData[]) => {
        this.messages = data.reverse();
        this.socketService.joinRoom(this.roomId);
      })
      .then(() => {
        this.route.params.subscribe((routeParams) => {
          this.conversation_id = parseInt(routeParams.id);
        });
      });

    this.msg = this.socketService.msg;
    this.msgSub = this.socketService.msg.subscribe((msg) => {
      this.messages.unshift(msg);
    });

   
  }

  sendMessage(message) {
    const msg = {
      id: this.userId,
      room: this.roomId,
      body: message,
      conversation_id: this.conversation_id,
      sent_by: this.userId,
      sent_by_user_id: this.userId,
      sent_by_username: this.username,
      created_at: Date.now().toString(),
    };

    this.socketService.sendMessage(msg);
    this.messageBody = '';
  }

  ngOnDestroy() {
    this.msgSub.unsubscribe();
  }
}
