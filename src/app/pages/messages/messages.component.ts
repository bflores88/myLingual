import { Component, OnInit } from '@angular/core';
import { BackendService } from '../../services/backend.services';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss'],
})
export class MessagesComponent implements OnInit {
  conversations: any = {};

  constructor(private backend: BackendService) {}

  ngOnInit() {
    this.backend.getConversations().then((data: any) => {
      this.conversations = data;
    });
  }
}
