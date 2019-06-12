import { Component, OnInit } from '@angular/core';
import { BackendService } from '../../services/backend.services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forums',
  templateUrl: './forums.component.html',
  styleUrls: ['./forums.component.scss'],
})
export class ForumsComponent implements OnInit {
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
