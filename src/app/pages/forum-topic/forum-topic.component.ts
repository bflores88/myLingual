import { Component, OnInit } from '@angular/core';
import { BackendService } from '../../services/backend.services';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-forum-topic',
  templateUrl: './forum-topic.component.html',
  styleUrls: ['./forum-topic.component.scss'],
})
export class ForumTopicComponent implements OnInit {
  constructor(public backend: BackendService, public activated: ActivatedRoute) {}

  forum_name: {
    name: string;
    id: number;
  } = {
    name: '',
    id: 0,
  };
  forum_posts: {
    id: number;
    created_by: number;
    title: string;
  }[] = [];

  ngOnInit() {
    let routeId = this.activated.snapshot.paramMap.get('id');
    this.backend.getSpecificForum(routeId).then((data: any) => {
      this.forum_posts = data[0].posts;
      this.forum_name.name = data[0].name;
      this.forum_name.id = data[0].id;
    });
  }
}
