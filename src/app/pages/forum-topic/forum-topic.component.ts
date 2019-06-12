import { Component, OnInit } from '@angular/core';
import { BackendService } from '../../services/backend.services';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-forum-topic',
  templateUrl: './forum-topic.component.html',
  styleUrls: ['./forum-topic.component.scss'],
})
export class ForumTopicComponent implements OnInit {
  constructor(private backend: BackendService, private activated: ActivatedRoute) {}

  forum_name: {
    name: string;
  } = {
    name: '',
  };
  forum_posts: {
    id: number;
    created_by: number;
    title: string;
  }[] = [];

  ngOnInit() {
    console.log('param', this.activated.snapshot.paramMap.get('id'));
    let routeId = this.activated.snapshot.paramMap.get('id');
    this.backend.getSpecificForum(routeId).then((data: any) => {
      console.log(data);
      this.forum_posts = data[0].posts;
      this.forum_name.name = data[0].name;
    });
  }
}
