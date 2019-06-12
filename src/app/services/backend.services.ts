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

  getForumTopics(): Promise<object> {
    return this.http.get('/api/forums').toPromise();
  }

  getSpecificForum(id): Promise<object> {
    return this.http.get(`/api/forums/${id}`).toPromise();
  }

  getSpecificPost(id): Promise<object> {
    console.log('get specific');
    return this.http.get(`/api/posts/${id}`).toPromise();
  }
}
