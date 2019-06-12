import { Component, OnInit } from '@angular/core';
import { BackendService } from '../../services/backend.services';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss'],
})
export class MessagesComponent implements OnInit {
  messages: any = {};
  messageBody: string = '';

  constructor(private backend: BackendService, private route: ActivatedRoute) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.backend.getMessages(id).then((data: any) => {
      this.messages = data;
    });
  }

  sendMessage() {
    const id = this.route.snapshot.paramMap.get('id');
    this.backend.sendMessage(id, this.messageBody).then((data: any) => {
      this.backend.getMessages(id).then((data: any) => {
        this.messages = data;
        this.messageBody = '';
      });
    });
  }
}
