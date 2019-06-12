import { Component, OnInit } from '@angular/core';
import { BackendService } from '../../services/backend.services';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-new-forum-post',
  templateUrl: './new-forum-post.component.html',
  styleUrls: ['./new-forum-post.component.scss'],
})
export class NewForumPostComponent implements OnInit {
  constructor(private backend: BackendService, private activated: ActivatedRoute) {}

  newPost: {
    body: string;
    sent_by: number;
  } = {
    body: '',
    sent_by: 1,
  };

  ngOnInit() {
    // console.log('param', this.activated.snapshot.paramMap.get('post_id'));
    let routeId = this.activated.snapshot.paramMap.get('post_id');
  }

  // postReply() {
  //   console.log(this.newReply);
  //   this.backend.addReply(
  //     parseInt(this.activated.snapshot.paramMap.get('post_id')),
  //     this.newReply.body,
  //     this.newReply.sent_by,
  //   );
  //   this.newReply.body = '';
  // }
}
