import { Component, OnInit } from '@angular/core';
import { BackendService } from '../../services/backend.services';
import { Router } from '@angular/router';
import { SessionService } from '../../services/session.service';
@Component({
  selector: 'app-invites',
  templateUrl: './invites.component.html',
  styleUrls: ['./invites.component.scss'],
})
export class InvitesComponent implements OnInit {
  user: {
    loggedIn: boolean;
    username: string;
    id: any;
  };

  constructor(private backend: BackendService, private router: Router, private session: SessionService) {
    this.user = this.session.getSession();
  }

  invites: any = [];

  acceptInvite(id) {
    let body = {
      accepted: true,
    };

    // console.log('accept');
    this.backend.respondToInvite(id, body).then((data: any) => {
      console.log('accept', data);

      this.invites = [];

      this.backend.getUserInvites().then((data: any) => {
        // this.contacts = data;
        // console.log('invites', data);
        data.forEach((invites) => {
          let inviteObj = {
            sent_at: '',
            user: '',
            id: '',
          };
          inviteObj.sent_at = invites.created_at;
          inviteObj.user = invites.requesters;
          inviteObj.id = invites.id;

          this.invites.push(inviteObj);
        });
        console.log('invites', this.invites);
      });
    });
  }

  rejectInvite(id) {
    let body = {
      accepted: false,
    };

    this.backend.respondToInvite(id, body).then((data: any) => {
      console.log('reject', data);

      this.invites = [];

      this.backend.getUserInvites().then((data: any) => {
        // this.contacts = data;
        // console.log('invites', data);
        data.forEach((invites) => {
          let inviteObj = {
            sent_at: '',
            user: '',
            id: '',
          };
          inviteObj.sent_at = invites.created_at;
          inviteObj.user = invites.requesters;
          inviteObj.id = invites.id;

          this.invites.push(inviteObj);
        });
        console.log('invites', this.invites);
      });
    });
  }

  ngOnInit() {
    this.backend.getUserInvites().then((data: any) => {
      // this.contacts = data;
      // console.log('invites', data);
      data.forEach((invites) => {
        let inviteObj = {
          sent_at: '',
          user: '',
          id: '',
        };
        inviteObj.sent_at = invites.created_at;
        inviteObj.user = invites.requesters;
        inviteObj.id = invites.id;

        this.invites.push(inviteObj);
      });
      console.log('invites', this.invites);
    });
  }
}
