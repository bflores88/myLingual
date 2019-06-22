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
  constructor(public backend: BackendService, public socketService: SocketService) {}

  ngOnInit() {
    this.backend.getConversations().then((data: any) => {
      this.conversations = data;
      this.conversations.forEach((conversation) => {
        return this.socketService.joinRoom(conversation.id);
      });
    });

  }
}
