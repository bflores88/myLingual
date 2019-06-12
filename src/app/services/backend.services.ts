import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class BackendService {
  constructor(private http: HttpClient) {}

  register(data) {
    return this.http.post('/api/register', data).toPromise();
  }

  login(data) {
    console.log('backend', data);
    return this.http.post('/api/login', data).toPromise();
  }

  logout() {
    return this.http.get('/api/logout').toPromise();
  }

  getConversations() {
    return this.http.get('/api/conversations').toPromise();
  }

  getMessages(id) {
    return this.http.get(`/api/conversations/${id}`).toPromise();
  }

  sendMessage(id, message) {
    const newMessage = { body: message };
    return this.http.post(`/api/conversations/${id}`, newMessage).toPromise();
  }

  getForumTopics(): Promise<object> {
    return this.http.get('/api/forums').toPromise();
  }

  getSpecificForum(id): Promise<object> {
    return this.http.get(`/api/forums/${id}`).toPromise();
  }

  getUserProfile(id): Promise<object> {
    return this.http.get(`/api/users/${id}`).toPromise();
  }
  
  getSpecificPost(id): Promise<object> {
    // console.log('get specific');
    return this.http.get(`/api/posts/${id}`).toPromise();
  }

  addReply(id: number, body: string, sent_by: number): Promise<object> {
    const newPost = { body, sent_by };
    return this.http.post(`/api/posts/${id}`, newPost).toPromise();
  }
}
