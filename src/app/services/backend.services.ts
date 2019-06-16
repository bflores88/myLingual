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

  getFlashcard(id: String) {
    return this.http.get(`/api/cards/${id}`).toPromise();
  }

  postFlashcard(data) {
    console.log('sdfkjsjfdskj');
    return this.http.post('/api/cards', data).toPromise();
  }

  translate(word: Object) {
    return this.http.post('/api/translate', word).toPromise();
  }

  postFlashcardImageUpload(data) {
    return this.http.post('/api/cards/upload', data).toPromise();
  }

  postDeckCard(data) {
    return this.http.post('/api/decks_cards', data).toPromise();
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
  addPost(id: number, body: string, title: string): Promise<object> {
    const newPost = { body, title };
    return this.http.post(`/api/forums/${id}`, newPost).toPromise();
  }

  getUserDecks(): Promise<object> {
    // console.log('get specific');
    return this.http.get(`/api/decks`).toPromise();
  }

  getSpecificDeck(id, target_language: string): Promise<object> {
    // console.log('get specific');
    let body = {
      target_language,
    };
    return this.http.get(`/api/decks/${id}`).toPromise();
  }

  getSpecificQuiz(id): Promise<object> {
    // console.log('get specific');
    return this.http.get(`/api/quizzes/${id}`).toPromise();
  }
  answerQuestion(id, body): Promise<object> {
    // console.log('get specific');
    return this.http.put(`/api/quiz_contents/${id}`, body).toPromise();
  }

  createTestQuiz(id): Promise<object> {
    // console.log('get specific');
    let body = {
      type: 'test',
    };
    return this.http.post(`/api/quizzes/${id}`, body).toPromise();
  }

  search(searchText: string): Promise<object> {
    return this.http.get(`/api/searches/all/${searchText}`).toPromise();
  }
  getUserContacts(): Promise<object> {
    return this.http.get(`/api/contacts`).toPromise();
  }

  getUserInvites(): Promise<object> {
    return this.http.get(`/api/contacts/invites`).toPromise();
  }

  respondToInvite(id, body): Promise<object> {
    return this.http.put(`/api/contacts/invites/${id}`, body).toPromise();
  }

  sendContactInvite(id): Promise<object> {
    let body = {
      invitee: id,
    };
    return this.http.post(`/api/contacts/invites`, body).toPromise();
  }

  getAllLanguages(): Promise<object> {
    return this.http.get(`/api/languages/all`).toPromise();
  }

  changeTargetLanguage(languageId): Promise<object> {
    let body = {
      language_id: languageId,
    };
    return this.http.put(`/api/languages/target`, body).toPromise();
  }
}
