'use strict';

const { Translate } = require('@google-cloud/translate');
const projectId = 'mylingual';
const Italian = require('../database/models/ItalianTranslation');
const Spanish = require('../database/models/SpanishTranslation');
const Japanese = require('../database/models/JapaneseTranslation');
const Language = require('../database/models/Language');

const translate = new Translate({
  projectId: projectId,
});

require('dotenv').config();

async function translator(word, wordId) {

  new Language()
    .fetchAll()
    .then((result) => {
      const resultJson = result.toJSON();

      let languages = [];

      resultJson.forEach((lang) => {
        const languageData = {
          lang_id: lang.id,
          lang: lang.language_code
        }

        languages.push(languageData);
      })

      return languages
    })
    .then((languages) => {

      const text = word;
    
      languages.forEach((lang) => {

        const target = lang.lang;

        if (lang.lang === 'en') {
          return;
        }
    
        translate
          .translate(text, target)
          .then((results) => {
            const translation = results[0];
    
            // console.log(`Text: ${text}`);
            // console.log(`Translation: ${translation}`);
    
            if (target === 'es') {
              return new Spanish()
                .save({
                  word_id: wordId,
                  language_id: lang.lang_id,
                  spanish_word: translation,
                })
                .then((result) => {
    
                  return console.log({ success: 'successfully added spanish word!' });
                })
                .catch((err) => {
                  console.log('error', err);
                });
            } else if (target === 'it') {
              return new Italian()
                .save({
                  word_id: wordId,
                  language_id: lang.lang_id,
                  italian_word: translation,
                })
                .then((result) => {
    
                  return console.log({ success: 'successfully added italian word!' });
                })
                .catch((err) => {
                  console.log('error', err);
                });
            } else if (target === 'ja') {
              return new Japanese()
                .save({
                  word_id: wordId,
                  language_id: lang.lang_id,
                  japanese_word: translation,
                })
                .then((result) => {
    
                  return console.log({ success: 'successfully added japanese word!' });
                })
                .catch((err) => {
                  console.log('error', err);
                });
            }
          })
          .catch((err) => {
            console.error('ERROR:', err);
          });

      })
    })
    .catch((err) => {
      console.log('error', err)
    })
}

module.exports = translator;

