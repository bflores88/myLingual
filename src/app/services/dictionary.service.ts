import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class DictionaryService {
  constructor(public http: HttpClient) {}

  validateWord(word: string) {
    return this.http.get(`/api/dictionary/validate/${word.toLowerCase()}`).toPromise();
  }

  getWordDefinitions(word: string) {
    return this.http.get(`/api/dictionary/${word}&definitions&true`).toPromise();
  }
}
