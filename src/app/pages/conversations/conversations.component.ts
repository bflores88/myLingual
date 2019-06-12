import { Component, OnInit } from '@angular/core';
import { BackendService } from '../../services/backend.services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-conversations',
  templateUrl: './conversations.component.html',
  styleUrls: ['./conversations.component.scss'],
})
export class ConversationsComponent implements OnInit {
  conversations: any = [];

  constructor(private backend: BackendService, private router: Router) {}

  ngOnInit() {
    this.backend.getConversations().then((data: any) => {
      this.conversations = data;
    });
  }

  viewConversation() {
    this.router.navigate([`/messages/${this.conversations.id}`]);
  }
}
