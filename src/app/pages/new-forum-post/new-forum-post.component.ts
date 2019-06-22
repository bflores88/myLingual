import { Component, OnInit } from '@angular/core';
import { BackendService } from '../../services/backend.services';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-new-forum-post',
  templateUrl: './new-forum-post.component.html',
  styleUrls: ['./new-forum-post.component.scss'],
})
export class NewForumPostComponent implements OnInit {
  constructor(public backend: BackendService, public activated: ActivatedRoute, public router: Router) {}

  newPost: {
    body: string;
    title: string;
  } = {
    body: '',
    title: '',
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

  createPost() {
    let routeId = parseInt(this.activated.snapshot.paramMap.get('id'));
    console.log(routeId);
    this.backend.addPost(routeId, this.newPost.body, this.newPost.title);
    this.newPost.body = '';
    this.newPost.title = '';
    this.router.navigateByUrl(`/forums/${routeId}`);
  }
}
