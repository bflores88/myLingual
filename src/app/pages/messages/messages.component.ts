import { Component, OnInit } from '@angular/core';
import { BackendService } from '../../services/backend.services';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss'],
})
export class MessagesComponent implements OnInit {
  messages: any = {};
  id: number;

  constructor(private backend: BackendService) {}

  ngOnInit() {
    this.backend.getMessages(this.id).then((data: any) => {
      this.messages = data;
    });
  }
}
