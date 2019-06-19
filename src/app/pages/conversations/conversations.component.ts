import { Component, OnInit } from '@angular/core';
import { BackendService } from '../../services/backend.services';
import { Socket } from 'ngx-socket-io';
import { SocketService } from 'src/app/services/socket.service';

@Component({
  selector: 'app-conversations',
  templateUrl: './conversations.component.html',
  styleUrls: ['./conversations.component.scss'],
})
export class ConversationsComponent implements OnInit {
  conversations: any = [];

  constructor(private backend: BackendService) {}

  ngOnInit() {
    this.backend.getConversations().then((data: any) => {
      this.conversations = data;
      console.log(this.conversations);
    });
  }
}
