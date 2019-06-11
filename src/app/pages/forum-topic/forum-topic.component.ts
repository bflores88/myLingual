import { Component, OnInit } from '@angular/core';
import { BackendService } from '../../services/backend.services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forum-topic',
  templateUrl: './forum-topic.component.html',
  styleUrls: ['./forum-topic.component.scss'],
})
export class ForumTopicComponent implements OnInit {
  constructor(private backend: BackendService) {}

  forum_topics: {
    id: number;
    name: string;
    posts: any;
  }[] = [];

  ngOnInit() {
    this.backend.getForumTopics().then((data: any) => {
      console.log(data);
      this.forum_topics = data;
    });
  }
}
