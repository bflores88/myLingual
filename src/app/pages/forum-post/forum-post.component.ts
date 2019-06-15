import { Component, OnInit } from '@angular/core';
import { BackendService } from '../../services/backend.services';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-forum-post',
  templateUrl: './forum-post.component.html',
  styleUrls: ['./forum-post.component.scss'],
})
export class ForumPostComponent implements OnInit {
  constructor(private backend: BackendService, private activated: ActivatedRoute) {}

  post_title: {
    title: string;
    body: string;
    created_by: number;
    created_by_id: number;
  } = {
    title: '',
    body: '',
    created_by: 0,
    created_by_id: 0,
  };
  post_replies: {
    id: number;
    sent_by: number;
    body: string;
  }[] = [];

  newReply: {
    body: string;
    sent_by: number;
  } = {
    body: '',
    sent_by: 1,
  };

  ngOnInit() {
    let routeId = this.activated.snapshot.paramMap.get('post_id');
    this.backend.getSpecificPost(routeId).then((data: any) => {
      this.post_title.title = data[0].title;
      this.post_title.body = data[0].body;
      this.post_title.created_by = data[0].created_by.name;
      this.post_title.created_by_id = data[0].created_by.id;
      this.post_replies = data[0].replies;
    });
  }

  postReply() {
    console.log(this.newReply);
    this.backend.addReply(
      parseInt(this.activated.snapshot.paramMap.get('post_id')),
      this.newReply.body,
      this.newReply.sent_by,
    );
    this.newReply.body = '';
  }
}
