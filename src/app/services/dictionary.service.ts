import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})

// const Dictionary = require('oxford-dictionary-api');
// const myDictionary = Dictionary();

export class DictionaryService {
  // Dictionary = require("oxford-dictionary-api");

  // myDictionary = new this.Dictionary(
  //   process.env.OXFORD_DICTIONARIES_APP_ID,
  //   process.env.OXFORD_DICTIONARIES_APP_KEY,
  // );

  test() {
    console.log('test');
  }


}