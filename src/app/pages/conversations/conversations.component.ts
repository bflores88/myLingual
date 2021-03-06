import { Component, OnInit } from '@angular/core';
import { BackendService } from '../../services/backend.services';
import { SocketService } from 'src/app/services/socket.service';

@Component({
  selector: 'app-conversations',
  templateUrl: './conversations.component.html',
  styleUrls: ['./conversations.component.scss'],
})
export class ConversationsComponent implements OnInit {
  conversations: any = [];

  constructor(public backend: BackendService, public socketService: SocketService) {}

  ngOnInit() {
    this.backend.getConversations().then((data: any) => {
      this.conversations = data;
    });
  }
}
