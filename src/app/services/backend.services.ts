import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class BackendService {
  constructor(private http: HttpClient) {}

  register(data) {
    return this.http.post('/api/register', data, { withCredentials: true }).toPromise();
  }

  login(data) {
    // console.log('backend', data);
    return this.http.post('/api/login', data, { withCredentials: true }).toPromise();
  }

  logout() {
    return this.http.get('/api/logout', { withCredentials: true }).toPromise();
  }

  googleLogin() {
    console.log('gets to googleLogin');
    return this.http.get('/api/google_user', { withCredentials: true }).toPromise();
  }

  getClientId() {
    return this.http.get('/api/google_signin', { withCredentials: true }).toPromise();
  }

  getFlashcards() {
    return this.http.get('/api/cards', { withCredentials: true }).toPromise();
  }

  getFlashcard(id: String) {
    return this.http.get(`/api/cards/${id}`, { withCredentials: true }).toPromise();
  }

  postFlashcard(data) {
    console.log('sdfkjsjfdskj');
    return this.http.post('/api/cards', data, { withCredentials: true }).toPromise();
  }

  translate(word: Object) {
    return this.http.post('/api/translate', word, { withCredentials: true }).toPromise();
  }

  postFlashcardImageUpload(data) {
    return this.http.post('/api/cards/upload', data, { withCredentials: true }).toPromise();
  }

  postDeckCard(data) {
    return this.http.post('/api/decks_cards', data, { withCredentials: true }).toPromise();
  }

  getConversations() {
    return this.http.get('/api/conversations', { withCredentials: true }).toPromise();
  }

  getMessages(id) {
    return this.http.get(`/api/conversations/${id}`, { withCredentials: true }).toPromise();
  }

  sendMessage(id, message) {
    const newMessage = { body: message };
    return this.http.post(`/api/conversations/${id}`, newMessage, { withCredentials: true }).toPromise();
  }

  getForumTopics(): Promise<object> {
    return this.http.get('/api/forums', { withCredentials: true }).toPromise();
  }

  getSpecificForum(id): Promise<object> {
    return this.http.get(`/api/forums/${id}`, { withCredentials: true }).toPromise();
  }

  getUserProfile(id): Promise<object> {
    return this.http.get(`/api/users/${id}`, { withCredentials: true }).toPromise();
  }

  getSpecificPost(id): Promise<object> {
    // console.log('get specific');
    return this.http.get(`/api/posts/${id}`, { withCredentials: true }).toPromise();
  }

  addReply(id: number, body: string, sent_by: number): Promise<object> {
    const newPost = { body, sent_by };
    return this.http.post(`/api/posts/${id}`, newPost, { withCredentials: true }).toPromise();
  }
  addPost(id: number, body: string, title: string): Promise<object> {
    const newPost = { body, title };
    return this.http.post(`/api/forums/${id}`, newPost, { withCredentials: true }).toPromise();
  }

  getUserDecks(): Promise<object> {
    // console.log('get specific');
    return this.http.get(`/api/decks`, { withCredentials: true }).toPromise();
  }

  getSpecificDeck(id: string): Promise<object> {
    // console.log('get specific');
    // let body = {
    //   target_language,
    // };
    return this.http.get(`/api/decks/${id}`, { withCredentials: true }).toPromise();
  }

  getSpecificQuiz(id): Promise<object> {
    // console.log('get specific');
    return this.http.get(`/api/quizzes/${id}`, { withCredentials: true }).toPromise();
  }
  answerQuestion(id, body): Promise<object> {
    // console.log('get specific');
    return this.http.put(`/api/quiz_contents/${id}`, body, { withCredentials: true }).toPromise();
  }

  createTestQuiz(id): Promise<object> {
    // console.log('get specific');
    let body = {
      type: 'test',
    };
    return this.http.post(`/api/quizzes/${id}`, body, { withCredentials: true }).toPromise();
  }

  search(searchText: string): Promise<object> {
    return this.http.get(`/api/searches/all/${searchText}`, { withCredentials: true }).toPromise();
  }

  searchCards(searchText: string): Promise<object> {
    return this.http.get(`/api/searches/cards/${searchText}`, { withCredentials: true }).toPromise();
  }

  searchUsers(searchText: string): Promise<object> {
    return this.http.get(`/api/searches/users/${searchText}`, { withCredentials: true }).toPromise();
  }

  getUserContacts(): Promise<object> {
    return this.http.get(`/api/contacts`, { withCredentials: true }).toPromise();
  }

  getUserInvites(): Promise<object> {
    return this.http.get(`/api/contacts/invites`, { withCredentials: true }).toPromise();
  }

  respondToInvite(id, body): Promise<object> {
    return this.http.put(`/api/contacts/invites/${id}`, body, { withCredentials: true }).toPromise();
  }

  sendContactInvite(id): Promise<object> {
    let body = {
      invitee: id,
    };
    return this.http.post(`/api/contacts/invites`, body, { withCredentials: true }).toPromise();
  }

  getAllLanguages(): Promise<object> {
    return this.http.get(`/api/languages/all`, { withCredentials: true }).toPromise();
  }

  // changeTargetLanguage(languageId): Promise<object> {
  //   let body = {
  //     language_id: languageId,
  //   };
  //   return this.http.put(`/api/languages/target`, body, { withCredentials: true }).toPromise();
  // }

  getUserLanguages(): Promise<object> {
    return this.http.get(`/api/languages`, { withCredentials: true }).toPromise();
  }

  changeTargetLanguage(id): Promise<object> {
    return this.http.put(`/api/languages/${id}`, { withCredentials: true }).toPromise();
  }
}
