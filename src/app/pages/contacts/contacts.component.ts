import { Component, OnInit } from '@angular/core';
import { BackendService } from '../../services/backend.services';
import { Router } from '@angular/router';
import { SessionService } from '../../services/session.service';
@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss'],
})
export class ContactsComponent implements OnInit {
  user: {
    loggedIn: boolean;
    username: string;
    id: any;
  };

  constructor(private backend: BackendService, private router: Router, private session: SessionService) {
    this.user = this.session.getSession();
  }

  contacts: any = [];

  ngOnInit() {
    this.backend.getUserContacts().then((data: any) => {
      // this.contacts = data;
      console.log(data);
      data.forEach((contact) => {
        if (contact.invitee != this.user.id) {
          let contactObj = {
            id: contact.id,
            person: contact.invitees,
          };
          this.contacts.push(contactObj);
        } else {
          let contactObj = {
            id: contact.id,
            person: contact.requesters,
          };
          this.contacts.push(contactObj);
        }
      });
      // console.log(this.contacts);
    });
  }

  deleteThisContact(id) {
    console.log('contact id', id);
    this.backend.deleteContact(id);

    this.backend.getUserContacts().then((data: any) => {
      // this.contacts = data;
      // console.log(data);
      this.contacts = [];
      data.forEach((contact) => {
        if (contact.invitee != this.user.id) {
          this.contacts.push(contact.invitees);
        } else {
          this.contacts.push(contact.requesters);
        }
      });
      // console.log(this.contacts);
    });
  }
}
