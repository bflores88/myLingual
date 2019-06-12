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

  getForumTopics(): Promise<object> {
    return this.http.get('/api/forums').toPromise();
  }

  getSpecificForum(id): Promise<object> {
    return this.http.get(`/api/forums/${id}`).toPromise();
  }
}
