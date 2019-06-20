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
  messageBody: string;
  msg: Observable<any>;
  private msgSub: Subscription;

  userId = 0;

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
    private backend: BackendService,
    private route: ActivatedRoute,
    private session: SessionService,
    private socketService: SocketService,
  ) {
    this.socketService.getMessage().subscribe((message) => {
      console.log('User data', message);
      this.messages.push(message);
    });
  }

  ngOnInit() {
    this.msgSub = this.socketService.msg.subscribe((msg) => (this.messageBody = msg));
    let user = this.session.getSession();
    this.userId = parseInt(user.id);

    console.log(this.userId);

    this.socketService.sendIdentity(this.userId);

    const id = this.route.snapshot.paramMap.get('id');
    this.backend.getMessages(id).then((data: MessageData[]) => {
      this.messages = data;
      console.log('**************', this.messages);
    });

    // this.socketService.getMessage().subscribe(
    //   msg => this.messageBody = msg;
    //   console.log('new message', this.messageBody);
    // );
    // this.sendMessage(msg);
  }

  sendMessage(message) {
    // const id = this.route.snapshot.paramMap.get('id');
    this.socketService.sendMessage(this.userId, message);
    console.log('backend service; sent msg');
  }

  // sendMessage(message) {
  //   const id = this.route.snapshot.paramMap.get('id');
  //   this.backend.sendMessage(id, message).then(() => {
  //     this.socketService.sendMessage(message);
  //     this.backend.getMessages(id).then((data: MessageData[]) => {
  //       this.messages = data;
  //       message = '';
  //       console.log('backend service; sent msg');
  //     });
  //   });
  // }

  getMessage() {
    return this.socketService.getMessage();
  }
}
