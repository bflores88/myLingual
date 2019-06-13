import { Component, OnInit } from '@angular/core';
import { BackendService } from 'src/app/services/backend.services';

interface Language {
  created_at: string;
  english_name: string;
  id: number;
  native_name: string;
  updated_at: string;
}

interface Translation {
  translation: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  languages: Language[] = [];
  text = 'Enter word or phrase here';
  sourceLanguageChoice: string;
  targetLanguageChoice: string;
  gotLanguages = false;

  translation = '';


  constructor(private backend: BackendService) { }

  ngOnInit() {
    this.backend.getLanguages()
    .then((result: Language[]) => {
      this.languages = result;
      this.sourceLanguageChoice = '3';
      this.targetLanguageChoice = '1';
      this.gotLanguages = true;
    })
  }

  onKey(event: any){
    this.text = event.target.value;
  }

  buttonFunction() {
    let sourceLanguageCode = '';
    let targetLanguageCode = '';

    const sourceLanguage = this.languages.filter((language: Language) => {
      if (language.id === parseInt(this.sourceLanguageChoice)) { return true }
    })
    const targetLanguage = this.languages.filter((language: Language) => {
      if (language.id === parseInt(this.targetLanguageChoice)) { return true }
    })
    
    if (targetLanguage[0].english_name === 'spanish'){
      targetLanguageCode = 'es';

    } else if (targetLanguage[0].english_name === 'italian'){
      targetLanguageCode = 'it';

    } else if (targetLanguage[0].english_name === 'english'){
      targetLanguageCode = 'en-US';
    }

    if (sourceLanguage[0].english_name === 'spanish'){
      sourceLanguageCode = 'es';

    } else if (sourceLanguage[0].english_name === 'italian'){
      sourceLanguageCode = 'it';

    } else if (sourceLanguage[0].english_name === 'english'){
      sourceLanguageCode = 'en-US';
    }

    if (this.text.length > 0 && sourceLanguageCode !== targetLanguageCode){
      this.testFunction(this.text, sourceLanguageCode, targetLanguageCode);
    } else {
      this.translation = 'Select a different language than the source to translate';
    }
  }

  testFunction(text: string, source: string, target: string) {
    this.backend.translate(text, source, target)
    .then((result: Translation) => {
      this.translation = result.translation;
    });
  }
}
