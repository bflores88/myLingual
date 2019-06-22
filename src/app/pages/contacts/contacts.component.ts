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
  newConversation: boolean;
  messageBody = '';
  messageTo = [];
  userList = [];
  notInMessage = [];
  addOthers: boolean;

  ngOnInit() {
    this.backend.getUserContacts().then((data: any) => {


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
      console.log(this.contacts);
    });
  }


  deleteThisContact(id) {
    console.log('contact id', id);
    this.backend.deleteContact(id).then((data: any) => {
      this.contacts = [];
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
    });
  }

  handleSendMessage(e) {

    this.newConversation = true;
    this.userList.push(parseInt(e.target.value));
    this.messageTo.push(e.target.name);
    this.notInMessage = [];

    this.contacts.forEach((contact) => {
      if (contact.person.id !== parseInt(e.target.value)) {
        this.notInMessage.push(contact); 
      }
    })
  }

  cancelSendMessage() {
    this.notInMessage = [];
    this.messageBody = '';
    this.messageTo = [];
    this.userList = [];
    this.newConversation = false;
  }

  handleAddMore() {
    if (!this.addOthers) {
      return this.addOthers = true;
    } else {
      return this.addOthers = false;
    }
    
  }

  handleNewMessage() {
    this.newConversation = false;

    const data = {
      body: this.messageBody,
      userList: this.userList
    }

    this.backend.postConversation(data).then((result) => {
      this.userList = [];
      this.messageBody = '';
    })
  }

  addToConversation(e) {
    console.log(e);
    if (e.target.checked) {
      this.userList.push(parseInt(e.target.value));
      this.messageTo.push(', ');
      this.messageTo.push(e.target.name);

    } else {
      const findInUserList = this.userList.indexOf(parseInt(e.target.value));
      this.userList.splice(findInUserList, 1);

      const findInMessageTo = this.messageTo.indexOf(e.target.name);
      this.messageTo.splice(findInMessageTo -1, 2);
    }

  }
  

}
