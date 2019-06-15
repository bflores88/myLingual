'use strict';

const { Translate } = require('@google-cloud/translate');
const projectId = 'mylingual';
const Italian = require('../database/models/ItalianTranslation');
const Spanish = require('../database/models/SpanishTranslation');
const Language = require('../database/models/Language');

const translate = new Translate({
  projectId: projectId,
});

require('dotenv').config();

async function translator(word, wordId) {
  const languages = [
    {
      lang_id: 1,
      lang: 'es',
    },
    {
      lang_id: 2,
      lang: 'it',
    },
  ];

  const text = word;

  languages.forEach((lang) => {
    const target = lang.lang;

    translate
      .translate(text, target)
      .then((results) => {
        const translation = results[0];

        console.log(`Text: ${text}`);
        console.log(`Translation: ${translation}`);

        if (target === 'es') {
          return new Spanish()
            .save({
              word_id: wordId,
              language_id: lang.lang_id,
              spanish_word: translation,
            })
            .then((result) => {
              console.log(result);
              return res.json({ success: 'successfully added spanish word!' });
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
              console.log(result);
              return res.json({ success: 'successfully added italian word!' });
            })
            .catch((err) => {
              console.log('error', err);
            });
        }
      })
      .catch((err) => {
        console.error('ERROR:', err);
      });
  });
}

module.exports = translator;