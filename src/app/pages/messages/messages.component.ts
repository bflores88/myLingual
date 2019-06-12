import { Component, OnInit } from '@angular/core';
import { BackendService } from '../../services/backend.services';
import { ActivatedRoute } from '@angular/router';

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

  constructor(private backend: BackendService, private route: ActivatedRoute) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.backend.getMessages(id).then((data: MessageData[]) => {
      this.messages = data;
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
