import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Data {
  word: string,
  fields: string,
  strictMatch: boolean,
}

@Injectable({
  providedIn: 'root',
})

export class DictionaryService {
  
  constructor(private http: HttpClient){}

  validateWord(word: string) {
    return this.http.get(`/api/dictionary/validate/${word}`).toPromise();
  }

  getWordDefinitions(word: string) {
    return this.http.get(`/api/dictionary/${word}&definitions&true`).toPromise();
  }
}